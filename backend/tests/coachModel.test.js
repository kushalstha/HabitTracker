import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { getCoachTips } from '../src/modules/coachModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

test('returns a fallback coaching message when the AI service rejects the request', async () => {
  const originalApiKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key';

  const generateContent = mock.fn(async () => {
    const error = new Error('403 Forbidden: denied access');
    error.status = 403;
    throw error;
  });

  const getGenerativeModel = mock.fn(() => ({ generateContent }));
  mock.method(GoogleGenerativeAI.prototype, 'getGenerativeModel', getGenerativeModel);

  try {
    const result = await getCoachTips([{ name: 'Drink Water', frequency: 'daily', streak: 3 }]);
    assert.match(result, /The AI service is unavailable right now/i);
  } finally {
    mock.restoreAll();
    if (originalApiKey === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalApiKey;
    }
  }
});
