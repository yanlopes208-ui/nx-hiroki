import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const palavra = req.query.palavra;

    if (!palavra) {
      return res.status(400).json({ error: "Faltou o parâmetro 'palavra' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const prompt = `
Você é um dicionário da língua portuguesa. 
Explique o significado da palavra abaixo de forma clara, objetiva e resumida. 
Não invente. Se a palavra não existir, diga "Palavra não encontrada".

Palavra: "${palavra}"
`;

    const result = await model.generateContent(prompt);
    const significado = result.response.text().trim();

    return res.status(200).json({
      palavra,
      significado
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ error: "Erro interno no servidor.", detalhe: error.message });
  }
}
