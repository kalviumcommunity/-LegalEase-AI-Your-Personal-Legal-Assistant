import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Prompt Demo"
  }
});

async function runZeroShot() {
  const prompt = "Write a short poem about a cat exploring the moon.";
  
  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  console.log("Zero-Shot Output:\n", response.choices[0].message.content);
}

async function runOneShot() {
  const prompt = `Here is an example of a short poem about a dog exploring the stars:
  
Example:
"The dog runs fast through cosmic light,
Chasing comets in the night.
Among the stars, so bright and soon,
He dreams of worlds beyond the moon."

Now, write a short poem about a cat exploring the moon.`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  console.log("One-Shot Output:\n", response.choices[0].message.content);
}

// Call the function you want to run:
//runZeroShot();
 runOneShot();
