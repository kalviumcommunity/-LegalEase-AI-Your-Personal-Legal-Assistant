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

async function runMultiShot() {
  const prompt = `Translate the following English sentences into French:

Example 1:  
Input: "Good morning."  
Output: "Bonjour."

Example 2:  
Input: "How are you?"  
Output: "Comment ça va ?"

Now, translate this sentence: "I love learning new languages."`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  console.log("Multi-Shot Output:\n", response.choices[0].message.content);
}

async function runStructuredOutput() {
  const prompt = `Write a short poem about a cat exploring the moon.
Return the output in JSON format with fields:
- title: string
- poem: string
- author: string (use "AI Poet")

Example output:
{
  "title": "Cat on the Moon",
  "poem": "The cat leaps high, chasing lunar beams, ...",
  "author": "AI Poet"
}`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  const content = response.choices[0].message.content;

  console.log("Structured Output:\n", content);

  // Optionally, parse JSON (if confident output is valid JSON)
  try {
    const json = JSON.parse(content);
    console.log("\nParsed JSON object:", json);
  } catch (e) {
    console.error("Failed to parse JSON:", e.message);
  }
}



// Call the function you want to run:
//runZeroShot();
// runOneShot();
//runMultiShot();
runStructuredOutput();