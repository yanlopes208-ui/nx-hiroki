import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { calcular } = req.query;

    if (!calcular) {
      return res.status(400).json({
        error: "Use ?calcular=expressão (ex: ?calcular=4x^2 ou ?calcular=2+2)"
      });
    }

    // Inicia o modelo Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt pedindo o cálculo
    const prompt = `
    Resolva passo a passo a expressão matemática abaixo.
    Retorne o resultado final simplificado.
    Expressão: ${calcular}

    Responda estritamente neste formato JSON:
    {
      "calculo": "passos da resolução",
      "resultado": "resultado final"
    }`;

    const resposta = await model.generateContent(prompt);
    const texto = resposta.response.text();

    // Tenta converter o JSON retornado
    let json;
    try {
      json = JSON.parse(texto);
    } catch {
      json = { calculo: texto, resultado: "Erro ao formatar resultado" };
    }

    return res.status(200).json(json);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro ao calcular expressão.",
      detalhe: err.message
    });
  }
}
