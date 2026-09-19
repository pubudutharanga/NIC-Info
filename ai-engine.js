/**
 * NIC Info — AI Engine (Client-Side)
 * Hybrid intelligence: Local NIC decoding + Gemma 4 API for conversational AI.
 * NIC numbers are ALWAYS decoded locally (never sent to API).
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     NIC DECODE ENGINE (100% local, zero latency)
     Ported from index.html core logic
     ═══════════════════════════════════════════════════════ */

  var OLD_NIC_REGEX = /\b[0-9]{9}[VvXx]\b/g;
  var NEW_NIC_REGEX = /\b[0-9]{12}\b/g;
  var OLD_NIC_STRICT = /^[0-9]{9}[VvXx]$/;
  var NEW_NIC_STRICT = /^[0-9]{12}$/;

  var FEMALE_DAY_OFFSET = 500;
  var CUMULATIVE_DAYS_LEAP = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
  var CUMULATIVE_DAYS_NON_LEAP = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  var DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var ZODIAC_SIGNS = [
    { name: 'Capricorn', symbol: '♑', start: [1, 1], end: [1, 19] },
    { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20] },
    { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22] },
    { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22] },
    { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21] },
    { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [12, 31] }
  ];

  function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }

  function getZodiac(month, day) {
    var md = month * 100 + day;
    for (var i = 0; i < ZODIAC_SIGNS.length; i++) {
      var s = ZODIAC_SIGNS[i];
      var sStart = s.start[0] * 100 + s.start[1];
      var sEnd = s.end[0] * 100 + s.end[1];
      if (md >= sStart && md <= sEnd) return s;
    }
    return ZODIAC_SIGNS[0]; // Capricorn fallback for Dec 22-31
  }

  function getGeneration(year) {
    if (year >= 2013) return 'Gen Alpha';
    if (year >= 1997) return 'Gen Z';
    if (year >= 1981) return 'Millennial';
    if (year >= 1965) return 'Gen X';
    if (year >= 1946) return 'Baby Boomer';
    return 'Silent Generation';
  }

  function nicDayToDate(nicDayOfYear, year) {
    var dayOfYear = nicDayOfYear > FEMALE_DAY_OFFSET
      ? nicDayOfYear - FEMALE_DAY_OFFSET
      : nicDayOfYear;

    var leap = isLeapYear(year);
    var maxDay = leap ? 366 : 365;
    if (dayOfYear < 1 || dayOfYear > maxDay) return null;

    if (!leap && dayOfYear >= 60) {
      dayOfYear -= 1;
    }

    var cumDays = leap ? CUMULATIVE_DAYS_LEAP : CUMULATIVE_DAYS_NON_LEAP;
    var month = 1;
    while (month <= 12 && dayOfYear > cumDays[month]) {
      month++;
    }
    var day = dayOfYear - cumDays[month - 1];
    return { month: month, day: day };
  }

  function calculatePreciseAge(birthYear, birthMonth, birthDay) {
    var now = new Date();
    var curYear = now.getFullYear();
    var curMonth = now.getMonth() + 1;
    var curDay = now.getDate();

    var years = curYear - birthYear;
    var months = curMonth - birthMonth;
    var days = curDay - birthDay;

    if (days < 0) {
      months--;
      var prevMonth = curMonth - 1;
      var prevMonthYear = curYear;
      if (prevMonth === 0) { prevMonth = 12; prevMonthYear--; }
      var daysInPrevMonth = (prevMonth === 2 && isLeapYear(prevMonthYear))
        ? 29 : DAYS_IN_MONTH[prevMonth];
      days += daysInPrevMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years: years, months: months, days: days };
  }

  function decodeNIC(nic) {
    var trimmed = nic.trim();
    var format = null;

    if (OLD_NIC_STRICT.test(trimmed)) {
      format = 'old';
    } else if (NEW_NIC_STRICT.test(trimmed)) {
      format = 'new';
    } else {
      return null;
    }

    var year, rawDayOfYear;
    if (format === 'old') {
      year = parseInt(trimmed.substring(0, 2), 10) + 1900;
      rawDayOfYear = parseInt(trimmed.substring(2, 5), 10);
    } else {
      year = parseInt(trimmed.substring(0, 4), 10);
      rawDayOfYear = parseInt(trimmed.substring(4, 7), 10);
    }

    // Determine gender
    var gender = null;
    var leap = isLeapYear(year);
    var maxMaleDay = leap ? 366 : 365;
    var maxFemaleDay = FEMALE_DAY_OFFSET + maxMaleDay;

    if (rawDayOfYear >= 1 && rawDayOfYear <= maxMaleDay) gender = 'Male';
    else if (rawDayOfYear >= FEMALE_DAY_OFFSET + 1 && rawDayOfYear <= maxFemaleDay) gender = 'Female';
    if (!gender) return null;

    var dateInfo = nicDayToDate(rawDayOfYear, year);
    if (!dateInfo) return null;

    var age = calculatePreciseAge(year, dateInfo.month, dateInfo.day);
    var weekday = WEEKDAYS[new Date(year, dateInfo.month - 1, dateInfo.day).getDay()];
    var zodiac = getZodiac(dateInfo.month, dateInfo.day);
    var generation = getGeneration(year);
    var dayOfYear = rawDayOfYear > FEMALE_DAY_OFFSET ? rawDayOfYear - FEMALE_DAY_OFFSET : rawDayOfYear;

    // Format conversion
    var altFormat = '';
    var altFormatLabel = '';
    if (format === 'old') {
      var yy = trimmed.substring(0, 2);
      var ddd = trimmed.substring(2, 5);
      var serial = trimmed.substring(5, 9);
      altFormat = '19' + yy + ddd + '0' + serial;
      altFormatLabel = 'New Format';
    } else {
      var yyyy = parseInt(trimmed.substring(0, 4), 10);
      if (yyyy < 2000) {
        var yyOld = trimmed.substring(2, 4);
        var dddOld = trimmed.substring(4, 7);
        var serial5 = trimmed.substring(7, 12);
        altFormat = yyOld + dddOld + serial5.substring(1) + 'V';
        altFormatLabel = 'Old Format';
      } else {
        altFormat = 'N/A (2000+ birth)';
        altFormatLabel = 'Old Format';
      }
    }

    // Voter status
    var voterStatus = 'N/A (New format)';
    if (format === 'old') {
      var suffix = trimmed.slice(-1).toUpperCase();
      voterStatus = suffix === 'V' ? 'V (Voter)' : 'X (Non-voter)';
    }

    return {
      nic: trimmed,
      format: format,
      year: year,
      month: dateInfo.month,
      day: dateInfo.day,
      monthName: MONTH_NAMES[dateInfo.month],
      dob: dateInfo.day + ' ' + MONTH_NAMES[dateInfo.month] + ' ' + year,
      gender: gender,
      age: age,
      ageText: age.years + ' years' + (age.months > 0 ? ', ' + age.months + ' months' : '') + (age.days > 0 ? ', ' + age.days + ' days' : ''),
      weekday: weekday,
      zodiac: zodiac,
      generation: generation,
      dayOfYear: dayOfYear,
      rawDayOfYear: rawDayOfYear,
      voterStatus: voterStatus,
      altFormat: altFormat,
      altFormatLabel: altFormatLabel
    };
  }

  /** Extract all NIC numbers from a text string */
  function extractNICs(text) {
    var nics = [];
    var seen = {};
    var match;

    // Reset regex lastIndex
    OLD_NIC_REGEX.lastIndex = 0;
    NEW_NIC_REGEX.lastIndex = 0;

    while ((match = OLD_NIC_REGEX.exec(text)) !== null) {
      var val = match[0].toUpperCase();
      if (!seen[val]) { nics.push(val); seen[val] = true; }
    }
    while ((match = NEW_NIC_REGEX.exec(text)) !== null) {
      if (!seen[match[0]]) { nics.push(match[0]); seen[match[0]] = true; }
    }
    return nics;
  }

  /* ═══════════════════════════════════════════════════════
     GEMMA 4 API CLIENT
     ═══════════════════════════════════════════════════════ */

  var API_ENDPOINT = '/api/gemma';
  var API_TIMEOUT = 12000; // 12 seconds

  /**
   * Call the Gemma 4 API via the Vercel serverless proxy.
   * @param {Array} messages - Conversation history [{role, text}]
   * @param {string} context - Optional local decode context to inject
   * @returns {Promise<{text: string, source: string}>}
   */
  async function callGemmaAPI(messages, context) {
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, API_TIMEOUT);

    try {
      var response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages, context: context || '' }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        var errData = await response.json().catch(function () { return {}; });
        throw new Error(errData.error || 'API request failed');
      }

      var data = await response.json();
      return { text: data.text || '', source: 'gemma4' };
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('timeout');
      }
      throw err;
    }
  }

  /* ═══════════════════════════════════════════════════════
     SMART ROUTER — Orchestrates local + API engines
     ═══════════════════════════════════════════════════════ */

  /**
   * Build context string from local NIC decode results for API enrichment.
   */
  function buildDecodeContext(results) {
    return results.map(function (r) {
      return 'NIC: ' + r.nic + ' → DOB: ' + r.dob + ', Gender: ' + r.gender +
        ', Age: ' + r.ageText + ', Weekday: ' + r.weekday +
        ', Zodiac: ' + r.zodiac.symbol + ' ' + r.zodiac.name +
        ', Generation: ' + r.generation +
        ', Format: ' + r.format + ', Day-of-Year: ' + r.dayOfYear +
        ', Voter: ' + r.voterStatus;
    }).join('\n');
  }

  /**
   * Generate follow-up suggestion chips based on the current interaction.
   */
  function generateSuggestions(userMessage, nicResults) {
    var suggestions = [];
    if (nicResults.length > 0) {
      suggestions.push('What zodiac sign is this?');
      suggestions.push('Tell me more about this NIC');
      if (nicResults[0].format === 'old') {
        suggestions.push('Convert to new format');
      } else {
        suggestions.push('Convert to old format');
      }
      suggestions.push('How does the day code work?');
    } else {
      suggestions.push('Decode my NIC number');
      suggestions.push('Old vs new NIC format');
      suggestions.push('How is gender encoded?');
      suggestions.push('What does V or X mean?');
    }
    return suggestions.slice(0, 4);
  }

  /**
   * Build a local-only fallback response when API is unavailable.
   */
  function buildLocalFallback(nicResults) {
    if (nicResults.length === 0) {
      return 'I\'m currently in offline mode, but I can still decode NIC numbers for you! Just paste any Sri Lankan NIC number and I\'ll extract the details instantly.';
    }

    var parts = [];
    nicResults.forEach(function (r) {
      parts.push('**' + r.nic + '** belongs to a **' + r.gender.toLowerCase() +
        '** born on **' + r.dob + '** (' + r.weekday + '). They are currently **' +
        r.age.years + ' years old** and their zodiac sign is ' +
        r.zodiac.symbol + ' **' + r.zodiac.name + '** (' + r.generation + ' generation).');
    });
    return parts.join('\n\n');
  }

  /**
   * Main entry point: process a user message through the hybrid engine.
   * @param {string} userMessage - The user's input text
   * @param {Array} conversationHistory - Previous messages [{role, text}]
   * @returns {Promise<Object>} - { nicCards, narrative, source, suggestions, isOffline }
   */
  async function processMessage(userMessage, conversationHistory) {
    // 1. Extract and decode NICs locally
    var nics = extractNICs(userMessage);
    var nicResults = [];
    nics.forEach(function (nic) {
      var result = decodeNIC(nic);
      if (result) nicResults.push(result);
    });

    // 2. Build context for API
    var context = nicResults.length > 0 ? buildDecodeContext(nicResults) : '';

    // 3. Build message history for API
    var apiMessages = conversationHistory.slice(-10).map(function (msg) {
      return { role: msg.role, text: msg.text };
    });
    apiMessages.push({ role: 'user', text: userMessage });

    // 4. Try Gemma 4 API
    var narrative = '';
    var source = nicResults.length > 0 ? 'hybrid' : 'ai';
    var isOffline = false;

    if (!navigator.onLine) {
      // Offline: use local fallback
      narrative = buildLocalFallback(nicResults);
      source = 'local';
      isOffline = true;
    } else {
      try {
        var apiResult = await callGemmaAPI(apiMessages, context);
        narrative = apiResult.text;
      } catch (err) {
        // API failed: use local fallback
        narrative = buildLocalFallback(nicResults);
        source = nicResults.length > 0 ? 'local' : 'local';
        isOffline = true;
      }
    }

    // 5. Generate follow-up suggestions
    var suggestions = generateSuggestions(userMessage, nicResults);

    return {
      nicCards: nicResults,
      narrative: narrative,
      source: source,
      suggestions: suggestions,
      isOffline: isOffline
    };
  }

  /* ═══════════════════════════════════════════════════════
     STREAMING SIMULATION — Word-by-word typewriter effect
     ═══════════════════════════════════════════════════════ */

  /**
   * Simulates token streaming by revealing text in small word groups.
   * Calls onChunk with each segment, then onDone when complete.
   * Returns a cancel() function.
   */
  function simulateStream(text, onChunk, onDone, shouldAbort) {
    var tokens = text.split(/(\s+)/);  // preserve whitespace tokens
    var idx = 0;
    var CHUNK = 3;        // tokens per tick
    var BASE_MS = 28;     // base delay between ticks
    var timerId = null;

    function tick() {
      if (typeof shouldAbort === 'function' && shouldAbort()) {
        if (onDone) onDone(true);
        return;
      }
      if (idx >= tokens.length) {
        if (onDone) onDone(false);
        return;
      }
      var chunk = tokens.slice(idx, idx + CHUNK).join('');
      idx += CHUNK;
      if (onChunk) onChunk(chunk);
      var jitter = (Math.random() * 20) | 0;
      timerId = setTimeout(tick, BASE_MS + jitter);
    }

    timerId = setTimeout(tick, 0);

    return function cancel() {
      if (timerId !== null) { clearTimeout(timerId); timerId = null; }
    };
  }

  /* ═══════════════════════════════════════════════════════
     SESSION PERSISTENCE — localStorage with 24h expiry
     ═══════════════════════════════════════════════════════ */

  var SESSION_KEY = 'nic-chat-v2';
  var SESSION_MAX_MSGS = 30;
  var SESSION_TTL = 86400000; // 24 hours in ms

  function saveSession(history) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        history: history.slice(-SESSION_MAX_MSGS),
        savedAt: Date.now()
      }));
    } catch (_) { /* quota exceeded — silently ignore */ }
  }

  function loadSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!Array.isArray(data.history) || !data.history.length) return null;
      if (Date.now() - (data.savedAt || 0) > SESSION_TTL) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return data;
    } catch (_) { return null; }
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (_) {}
  }

  /* ═══════════════════════════════════════════════════════
     PUBLIC API — Expose to global scope
     ═══════════════════════════════════════════════════════ */

  window.NICEngine = {
    processMessage: processMessage,
    decodeNIC: decodeNIC,
    extractNICs: extractNICs,
    buildDecodeContext: buildDecodeContext,
    simulateStream: simulateStream,
    saveSession: saveSession,
    loadSession: loadSession,
    clearSession: clearSession
  };

})();
