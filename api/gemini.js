import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.propmt;

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'propmt' na URL." });
    }

    // DEBUG temporário: veja se a chave está vindo
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não encontrada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const PERSONALIDADE = `
Você é uma IA criativa, educada e engraçada. 
Responda sempre de forma útil e simpática.
`;

    const result = await model.generateContent(`${PERSONALIDADE}\nUsuário: ${prompt}\nIA:`);
    const resposta = result.response.text();

    return res.status(200).json({ resposta });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ 
      error: "Erro interno no servidor.", 
      detalhe: error.message 
    });
  }
}
