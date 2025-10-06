import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    let palavras = req.query.palavra;

    if (!palavras) {
      return res.status(400).json({ error: "Faltou o parâmetro 'palavra' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada." });
    }

    // Aceita vírgula, // ou ponto e vírgula como separador
    palavras = palavras
      .split(/[,/]+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    // Monta o prompt para todas as palavras
    const prompt = `
Você é um dicionário da língua portuguesa. 
Explique o significado de cada palavra abaixo de forma clara, objetiva e resumida. 
Formate assim:

**Palavra**
Significado

Se alguma palavra não existir, diga "Palavra não encontrada".

Palavras:
${palavras.map((p) => `- ${p}`).join("\n")}
`;

    const result = await model.generateContent(prompt);
    const texto = result.response.text().trim();

    return res.status(200).json({
      palavras,
      resultado: texto
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({
      error: "Erro interno no servidor.",
      detalhe: error.message
    });
  }
}
