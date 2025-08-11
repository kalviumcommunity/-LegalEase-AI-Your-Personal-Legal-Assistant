import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Your site URL (if any)
    "X-Title": "Zero-Shot Prompt Demo" // App name
  }
});

async function runZeroShot() {
  const prompt = "Write a short poem about a cat exploring the moon.";
  
  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo", // or "openai/gpt-4"
    messages: [{ role: "user", content: prompt }]
  });

  console.log(response.choices[0].message.content);
}

runZeroShot();
