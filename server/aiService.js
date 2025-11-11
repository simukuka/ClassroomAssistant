import axios from "axios";

export const generateSummary = async (notes) => {
  try {
    const inputText = notes.substring(0, 1000); // optional limit

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama2",
        prompt: `Give me a concise, clear summary of the following text:\n\n${inputText}`
      },
      { responseType: "stream" }
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
    throw new Error("AI service failed to generate summary: " + error.message);
  }
};

export const generateExplanation = async (notes)=>{
  try {
    const inputText = notes.substring(0, 1000); // optional limit

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama2",
        prompt: `Give me a concise, clear explanation of the following text:\n\n${inputText}`
      },
      { responseType: "stream" }
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
    throw new Error("AI service failed to generate summary: " + error.message);
  }
}