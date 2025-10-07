import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { calcular } = req.query;

    if (!calcular) {
      return res.status(400).json({
        error: "Use ?calcular=expressão (ex: ?calcular=4x^2 ou ?calcular=2+2)"
      });
    }

    // Inicia o modelo Gemini 2.5 Flash
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prompt instruindo o modelo a retornar JSON puro
    const prompt = `
Resolva passo a passo a expressão matemática abaixo e retorne o resultado final.
Se a expressão envolver letras (como x), resolva simbolicamente se possível.
Expressão: ${calcular}

Responda *apenas* neste formato JSON puro, sem usar crases, markdown ou explicações extras:

{
  "calculo": "explique passo a passo aqui",
  "resultado": "resultado final aqui"
}
`;

    const resposta = await model.generateContent(prompt);
    const texto = resposta.response.text();

    // Remove blocos de código ou markdown que o Gemini possa incluir
    let json;
    try {
      const textoLimpo = texto
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      json = JSON.parse(textoLimpo);
    } catch {
      json = { calculo: texto, resultado: "Erro ao formatar resultado" };
    }

    if (!json.calculo || !json.resultado) {
      json = {
        calculo: texto,
        resultado: "Erro ao interpretar resposta do modelo."
      };
    }

    // Monta o novo formato de resposta
    const formatado = {
      "calc/result": `**Cálculo**\n${json.calculo}\n\n**Resposta**\n${json.resultado}`
    };

    return res.status(200).json(formatado);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro ao calcular expressão.",
      detalhe: err.message
    });
  }
}
