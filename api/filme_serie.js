import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const text = req.query.text;

    if (!text) {
      return res.status(400).json({
        error: "Faltou o parâmetro 'text' na URL. Exemplo: ?text=Breaking Bad"
      });
    }

    // Checa se a chave do Gemini existe
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Chave da API do Gemini ausente. Configure GEMINI_API_KEY nas variáveis de ambiente."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt principal
    const prompt = `
      Me dê as seguintes informações sobre "${text}" em formato JSON:
      {
        "nome": "Nome do filme ou série",
        "descricao": "Um resumo curto e interessante da história em português, seguido por informações adicionais como:
        - Gênero
        - Avaliação média (nota de 0 a 10)
        - Criado por
        - Elenco principal (até 5 nomes)"
      }
      Responda apenas o JSON puro.
    `;

    const result = await model.generateContent(prompt);
    const resposta = result.response.text();

    // Tenta converter pra JSON puro
    let data;
    try {
      data = JSON.parse(resposta);
    } catch {
      const jsonLimpo = resposta.match(/\{[\s\S]*\}/);
      data = jsonLimpo ? JSON.parse(jsonLimpo[0]) : { error: "Falha ao gerar JSON válido." };
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erro interno do servidor.",
      detalhes: err.message
    });
  }
}
