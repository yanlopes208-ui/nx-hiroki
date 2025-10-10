import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { code, to } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Use ?code=seuCodigoAqui" });
    }
    if (!to) {
      return res.status(400).json({ error: "Use ?to=nomeDaBibliotecaDestino" });
    }

    // Inicializa o Gemini com sua chave da API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt para conversão
    const prompt = `
Converta o seguinte código da biblioteca Aoi.js para ${to}.
Explique em comentários o que mudou, se necessário.
Mantenha o foco apenas no código convertido.

Código original:
${code}
`;

    // Gera resposta
    const result = await model.generateContent(prompt);
    const resposta = result.response.text();

    return res.status(200).json({
      original: code,
      convertido: resposta.trim(),
      biblioteca_destino: to,
      modelo_usado: "gemini-2.5-flash"
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Erro interno ao conectar com o Gemini." });
  }
}
