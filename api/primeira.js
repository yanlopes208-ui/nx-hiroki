import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// 🔹 Pegue sua API KEY do Gemini em https://aistudio.google.com/app/apikey
const genAI = new GoogleGenerativeAI(process.env.AIzaSyC1kHoO-udo69HP-FzrsEiv40M6ikiBCRU);

// 🔹 Personalidade base do bot
const PERSONALIDADE = `
Você é um assistente criativo, educado e engraçado. 
Responda de forma útil, breve e com um toque de humor quando apropriado.
`;

app.get("/api/gemini", async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `${PERSONALIDADE}\nUsuário: ${prompt}\nIA:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response.text();

    res.json({ resposta: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar resposta com o Gemini." });
  }
});

// 🔹 Exportar o app para funcionar na Vercel
export default app;
