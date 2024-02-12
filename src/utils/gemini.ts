import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI ?? "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
