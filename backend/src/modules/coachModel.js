import { GoogleGenerativeAI } from "@google/generative-ai";

const PREFERRED_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

// Free-tier quotas are applied per model, so if the preferred model is
// rate-limited or exhausted we fall back to other models with separate quotas.
const FALLBACK_MODELS = [
  "gemini-3.6-flash",
  "gemini-2.0-flash",
];

function buildFallbackCoachMessage(habits, reason = null) {
  const habitLines = (habits || [])
    .map((habit) => `- ${habit.name}: keep the streak alive with one small action today.`)
    .join("\n");

  const reasonText = reason
    ? `The AI service is unavailable right now (${reason}).`
    : "The AI service is unavailable right now.";

  return [
    "Your consistency already matters.",
    reasonText,
    habitLines,
    "Pick one tiny action today and let momentum carry the rest.",
  ].filter(Boolean).join("\n");
}

function isQuotaError(error) {
  const status = error?.status || error?.response?.status;
  const message = (error?.message || "").toLowerCase();
  return status === 429 || message.includes("429") || message.includes("quota");
}

function isDeniedError(error) {
  const status = error?.status || error?.response?.status;
  const message = (error?.message || "").toLowerCase();
  return (
    status === 403 ||
    message.includes("denied") ||
    message.includes("forbidden") ||
    message.includes("access")
  );
}

function isUnsupportedModelError(error) {
  const status = error?.status || error?.response?.status;
  const message = (error?.message || "").toLowerCase();
  return (
    status === 404 ||
    message.includes("not found") ||
    message.includes("no longer available") ||
    message.includes("unsupported model") ||
    message.includes("model") && message.includes("is not supported")
  );
}

function retryDelayMs(error) {
  const retryInfo = error?.errorDetails?.find(
    (detail) =>
      detail["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
  );
  const seconds = parseFloat(String(retryInfo?.retryDelay || "").replace("s", ""));
  if (Number.isFinite(seconds)) {
    return Math.min(Math.max(Math.ceil(seconds * 1000), 1000), 10_000);
  }
  return 3000;
}

async function generateWithModel(apiKey, model, prompt) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const generativeModel = genAI.getGenerativeModel({ model });

  const result = await generativeModel.generateContent(prompt);
  return result.response.text();
}

export async function getCoachTips(habits) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return buildFallbackCoachMessage(habits, "GEMINI_API_KEY is not configured");
  }

  if (!habits || habits.length === 0) {
    return "Add at least one habit first, then I can give you personalized coaching.";
  }

  const summary = habits
    .map(
      (habit) =>
        `- ${habit.name} (${habit.frequency}): streak of ${habit.streak} day(s)`
    )
    .join("\n");

  const prompt = `You are a friendly habit coach for a productivity app. Review these habits and give short, encouraging coaching tips.

Habits and streaks:
${summary}

Write 3 concise bullet points using "- " prefixes. Each bullet should mention the habit, the current streak, and one practical next step. Keep the tone warm, motivating, and brief. Do not add extra sections or explanations.`;

  const models = [
    PREFERRED_MODEL,
    ...FALLBACK_MODELS.filter((model) => model !== PREFERRED_MODEL),
  ];

  const attempts = [];
  let lastError = null;
  let anyDenied = false;
  let anyQuota = false;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      return await generateWithModel(apiKey, model, prompt);
    } catch (error) {
      lastError = error;
      attempts.push(`${model}: ${error?.message || error}`);
      console.error(`Gemini coaching failed with ${model}:`, error?.message || error);

      if (isDeniedError(error)) {
        anyDenied = true;
      }
      if (isQuotaError(error)) {
        anyQuota = true;
      }
      if (isUnsupportedModelError(error) && i < models.length - 1) {
        console.warn(`Falling back from unsupported Gemini model ${model}`);
      }

      // Only wait before the next attempt on rate-limit/quota errors; other
      // errors (denied access, unknown model) fail fast.
      if (isQuotaError(error) && i < models.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs(error)));
      }
    }
  }

  if (anyDenied || anyQuota) {
    return buildFallbackCoachMessage(habits, lastError?.message || lastError);
  }

  return buildFallbackCoachMessage(habits, lastError?.message || lastError);
}