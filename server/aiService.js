import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama2";
const MAX_INPUT_LENGTH = 10000; // Increased from 1000

export const generateSummary = async (notes) => {
  try {
    const inputText = notes.substring(0, MAX_INPUT_LENGTH);

    const response = await axios.post(
      OLLAMA_API_URL,
      {
        model: OLLAMA_MODEL,
        prompt: `Give me a concise, clear summary of the following text. Focus on key points and main ideas:\n\n${inputText}`
      },
      { 
        responseType: "stream",
        timeout: 120000 // 2 minute timeout
      }
    );

    return await new Promise((resolve, reject) => {
      let result = "";

      response.data.on("data", (chunk) => {
        try {
          const json = JSON.parse(chunk.toString());
          if (json.response) {
            result += json.response;
          }
        } catch (err) {
          // Ignore partial JSON parse errors while streaming
        }
      });

      response.data.on("end", () => resolve(result.trim()));
      response.data.on("error", reject);
    });

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error("Cannot connect to AI service. Please ensure Ollama is running.");
    }
    if (error.code === 'ETIMEDOUT') {
      throw new Error("AI service request timed out. Please try again.");
    }
    throw new Error("AI service failed to generate summary: " + error.message);
  }
};

export const generateExplanation = async (notes) => {
  try {
    const inputText = notes.substring(0, MAX_INPUT_LENGTH);

    const response = await axios.post(
      OLLAMA_API_URL,
      {
        model: OLLAMA_MODEL,
        prompt: `Give me a clear, detailed explanation of the following text. Break down complex concepts into simple terms:\n\n${inputText}`
      },
      { 
        responseType: "stream",
        timeout: 120000 // 2 minute timeout
      }
    );

    return await new Promise((resolve, reject) => {
      let result = "";

      response.data.on("data", (chunk) => {
        try {
          const json = JSON.parse(chunk.toString());
          if (json.response) {
            result += json.response;
          }
        } catch (err) {
          // Ignore partial JSON parse errors while streaming
        }
      });

      response.data.on("end", () => resolve(result.trim()));
      response.data.on("error", reject);
    });

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error("Cannot connect to AI service. Please ensure Ollama is running.");
    }
    if (error.code === 'ETIMEDOUT') {
      throw new Error("AI service request timed out. Please try again.");
    }
    throw new Error("AI service failed to generate explanation: " + error.message);
  }
}