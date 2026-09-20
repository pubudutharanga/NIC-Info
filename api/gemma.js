/**
 * NIC Info — Gemma 4 API Proxy (Vercel Serverless Function)
 * Securely proxies chat requests to Google AI Studio (Gemini API / Gemma 4 model).
 * API key is stored in Vercel environment variables — never exposed to the client.
 */

const GEMMA_MODEL = process.env.GEMMA_MODEL || 'gemma-4-26b-a4b-it';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT = `You are the NIC Info AI Assistant — a friendly, concise expert on Sri Lankan National Identity Cards (NICs). You help users understand NIC formats, interpret decoded NIC data, and learn about Sri Lanka's identity system.

Key knowledge:
- Old NIC format: 9 digits + V/X (e.g. 941234567V). Structure: YY DDD NNNN C. YY = birth year (19xx assumed), DDD = day-of-year (1-366 male, 501-866 female, subtract 500 for females), NNNN = serial, C = V(voter) or X(non-voter).
- New NIC format: 12 digits (e.g. 199412345678). Structure: YYYY DDD NNNNN. YYYY = full birth year, DDD = day-of-year (same gender encoding), NNNNN = serial + check digit.
- Gender: day values 1-366 = Male, 501-866 = Female (subtract 500 for actual day).
- Day 60 is skipped in non-leap years to keep March 1 = day 61 consistently.
- New format issued since 2016. Old format issued 1972-2015.

Formatting and Delivery Guidelines:
- Respond DIRECTLY to the user with the final conversational message only.
- NEVER output internal reasoning, thinking traces, checklists, evaluation against rules, or scratchpad notes.
- NEVER repeat or echo the user's prompt or greeting metadata (e.g. do NOT write 'User says:', 'Intent:', etc.).
- When the user shares decoded NIC data (DOB, age, gender), narrate it warmly and conversationally. Add fun facts like zodiac sign, birth stone, Chinese zodiac year, what generation they belong to, or notable events from their birth year.
- Keep responses concise: 2-3 short paragraphs maximum.
- Use clean markdown formatting (bold, bullet lists) when helpful.
- Never fabricate NIC numbers or personal data.
- Maintain the privacy-first ethos of NIC Info.
- If asked about things completely unrelated to Sri Lanka or NICs, politely redirect to NIC-related topics.
- Be warm, helpful, and approachable in tone.`;

/**
 * Robustly cleans internal thought traces, model scratchpads, or leaked reflection steps.
 */
function cleanModelOutput(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Remove XML/channel thought tags (<thought>, <think>, <|channel>thought...<channel|>)
  text = text.replace(/<(thought|think|reasoning|scratchpad)>[\s\S]*?<\/\1>/gi, '');
  text = text.replace(/<\|channel\|?>thought[\s\S]*?<\|?channel\|?>/gi, '');
  text = text.replace(/<\|thought\|?>[\s\S]*?<\|\/?thought\|?>/gi, '');

  // 2. Remove trailing self-evaluation checklists (e.g. "* Is it concise? Yes.")
  text = text.replace(/(?:^|\n)\s*[*•-]?\s*(?:Is it [^?\n]+\?|Does it follow [^?\n]+\?|Self-evaluation:?|Checklist:?)\s*(?:Yes|No|Checked|Pass|Done)[\s\S]*$/gi, '');

  // 3. Remove leading prompt echoes / scratchpads if model started with planning breakdown
  // e.g. "• User says: ... \n * Intent: ... \n * Role: ..."
  if (/^\s*(?:[•*-]\s*)?(?:User says:|User query:|Intent:|Task:|Goal:|Persona:)/i.test(text)) {
    const quotedMatch = text.match(/"([^"\n]{10,}[\s\S]*?)"/);
    if (quotedMatch && quotedMatch[1] && (quotedMatch[1].includes('Hello') || quotedMatch[1].includes('NIC') || quotedMatch[1].includes('I\'m') || quotedMatch[1].includes('welcome') || quotedMatch[1].includes('help'))) {
      text = quotedMatch[1];
    } else {
      const lines = text.split('\n');
      const filtered = [];
      let pastScratchpad = false;
      for (const line of lines) {
        const trimmed = line.trim();
        if (!pastScratchpad) {
          if (/^(?:[•*-]\s*)?(?:User says|Intent|Role|Goal|Persona|Friendly|Helpful|Acknowledge|Briefly explain|Invite the user)/i.test(trimmed)) {
            continue;
          }
          if (trimmed.length > 0) {
            pastScratchpad = true;
            filtered.push(trimmed.replace(/^[*•-]\s*"?/, '').replace(/"$/, ''));
          }
        } else {
          filtered.push(line);
        }
      }
      if (filtered.length > 0) {
        text = filtered.join('\n');
      }
    }
  }

  return text.trim();
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key exists
  const apiKey = process.env.GEMMA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Validate request body
  const { messages, context } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // Enforce message length limit
  const lastMessage = messages[messages.length - 1];
  if (lastMessage && lastMessage.text && lastMessage.text.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
  }

  try {
    // Build conversation contents for Gemini API
    // Strictly enforce alternating user and model turns
    const contents = [];
    const recentMessages = messages.slice(-10);

    for (const msg of recentMessages) {
      if (!msg || !msg.text) continue;
      const role = (msg.role === 'assistant' || msg.role === 'model') ? 'model' : 'user';
      const text = String(msg.text).trim();
      if (!text) continue;

      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += '\n' + text;
      } else {
        contents.push({
          role: role,
          parts: [{ text: text }]
        });
      }
    }

    // Ensure conversation starts with 'user'
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    // Ensure conversation ends with 'user'
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user' });
    }

    // If there's local NIC decode context, inject it into the last user message
    if (context && typeof context === 'string' && context.trim().length > 0) {
      const lastEntry = contents[contents.length - 1];
      lastEntry.parts[0].text += '\n\n[Local NIC Decode Results — use this data in your response]:\n' + context.trim();
    }

    // Call Gemma / Gemini model via Google AI Studio
    const apiUrl = `${API_BASE}/${GEMMA_MODEL}:generateContent?key=${apiKey}`;

    const requestPayload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1000,
        thinkingConfig: {
          thinking_level: 'minimal',
          include_thoughts: false
        }
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
      ]
    };

    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload)
    });

    // Fallback: If model endpoint rejects thinkingConfig with 400, retry cleanly without it
    if (!response.ok && response.status === 400) {
      const errClone = await response.clone().json().catch(() => ({}));
      const errStr = JSON.stringify(errClone);
      if (errStr.includes('thinking') || errStr.includes('thinkingConfig') || errStr.includes('thinking_level')) {
        delete requestPayload.generationConfig.thinkingConfig;
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload)
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemma API error:', response.status, errorData);
      return res.status(502).json({
        error: 'AI service temporarily unavailable',
        status: response.status
      });
    }

    const data = await response.json();

    // Extract text parts, filtering out any dedicated thought parts
    const candidate = data.candidates?.[0];
    const rawParts = candidate?.content?.parts || [];

    const textParts = rawParts.filter(p => !p.thought && typeof p.text === 'string' && p.text.trim().length > 0);
    let generatedText = (textParts.length > 0 ? textParts : rawParts)
      .map(p => p.text || '')
      .join('');

    // Clean any leaked model scratchpad/thought tags
    generatedText = cleanModelOutput(generatedText);

    if (!generatedText) {
      return res.status(502).json({ error: 'No response generated' });
    }

    return res.status(200).json({
      text: generatedText,
      source: 'gemma4'
    });

  } catch (error) {
    console.error('Proxy error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
