import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const PERSONALIDADE = `
Você é uma IA criativa, educada e engraçada. 
Responda sempre de forma útil e simpática.
`;

    const result = await model.generateContent(`${PERSONALIDADE}\nUsuário: ${prompt}\nIA:`);
    const resposta = result.response.text();

    res.status(200).json({ resposta });
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
