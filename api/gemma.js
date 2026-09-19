/**
 * NIC Info — Gemma 4 API Proxy (Vercel Serverless Function)
 * Securely proxies chat requests to Google AI Studio (Gemini API / Gemma 4 model).
 * API key is stored in Vercel environment variables — never exposed to the client.
 */

const GEMMA_MODEL = 'gemma-4-12b-it';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SYSTEM_PROMPT = `You are the NIC Info AI Assistant — a friendly, concise expert on Sri Lankan National Identity Cards (NICs). You help users understand NIC formats, interpret decoded NIC data, and learn about Sri Lanka's identity system.

Key knowledge:
- Old NIC format: 9 digits + V/X (e.g. 941234567V). Structure: YY DDD NNNN C. YY = birth year (19xx assumed), DDD = day-of-year (1-366 male, 501-866 female, subtract 500 for females), NNNN = serial, C = V(voter) or X(non-voter).
- New NIC format: 12 digits (e.g. 199412345678). Structure: YYYY DDD NNNNN. YYYY = full birth year, DDD = day-of-year (same gender encoding), NNNNN = serial + check digit.
- Gender: day values 1-366 = Male, 501-866 = Female (subtract 500 for actual day).
- Day 60 is skipped in non-leap years to keep March 1 = day 61 consistently.
- New format issued since 2016. Old format issued 1972-2015.

Rules:
- When the user shares decoded NIC data (DOB, age, gender), narrate it conversationally. Add fun facts like zodiac sign, birth stone, Chinese zodiac year, what generation they belong to, or notable events from their birth year.
- Keep responses concise: 2-4 short paragraphs maximum.
- Use markdown formatting when helpful (bold, lists, etc).
- Never fabricate NIC numbers or personal data.
- Maintain the privacy-first ethos of NIC Info.
- If asked about things completely unrelated to Sri Lanka or NICs, politely redirect to NIC-related topics.
- Be warm, helpful, and slightly playful in tone.`;

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
    // Build conversation contents for Gemma 4
    const contents = [];

    // Add conversation history (last 10 turns)
    const recentMessages = messages.slice(-10);
    for (const msg of recentMessages) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    // If there's local NIC decode context, inject it into the last user message
    if (context && contents.length > 0) {
      const lastEntry = contents[contents.length - 1];
      if (lastEntry.role === 'user') {
        lastEntry.parts[0].text += '\n\n[Local NIC Decode Results — use this data in your response]:\n' + context;
      }
    }

    // Call Gemma 4 via Gemini API
    const apiUrl = `${API_BASE}/${GEMMA_MODEL}:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 800,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemma API error:', response.status, errorData);
      return res.status(502).json({
        error: 'AI service temporarily unavailable',
        status: response.status
      });
    }

    const data = await response.json();

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

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
