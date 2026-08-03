import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured. Add it to backend/.env");
}

const ai = new GoogleGenAI({ apiKey });

const interaction = await ai.interactions.create({
  model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  input: "In this habit tracker app, you are a habit coach. You will provide personalized advice and encouragement to users based on their habits and progress. Please provide a motivational message for a user who has been consistently completing their daily habits for the past week.",
  system_instructions: "You are agent for Habit Tracker app. You will provide personalized advice and encouragement to users based on their habits and progress. Please provide a motivational message for a user who has been consistently completing their daily habits for the past week.You will only respond with the motivational message and nothing else. Do not include any additional text or explanations. You wil only provude about Habit Tracker app and the user's habits and progress. Do not provide any other information or advice unrelated to the user's habits and progress. Your response should be concise, clear, and focused on motivating the user to continue their positive habit streak.",
});

console.log(interaction.output_text);
