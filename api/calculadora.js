import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    let { calcular } = req.query;

    if (!calcular) {
      return res.status(400).json({
        error: "Use ?calcular=expressão (ex: ?calcular=4x^2 ou ?calcular=2+2)"
      });
    }

    // 🧠 Normaliza a expressão recebida:
    calcular = calcular
      // Multiplicação: ponto, vírgula, x, ×
      .replace(/(\d+)\s*[\.,x×]\s*(\d+)/gi, "$1 * $2")
      // Divisão: ÷, :
      .replace(/(\d+)\s*[÷:]\s*(\d+)/gi, "$1 / $2")
      // Potenciação: expoentes ² ³
      .replace(/(\d+)\s*²/g, "$1^2")
      .replace(/(\d+)\s*³/g, "$1^3")
      // Raiz quadrada: √9 → sqrt(9)
      .replace(/√\s*(\d+)/g, "sqrt($1)")
      // Porcentagem: 50% → 0.5
      .replace(/(\d+)\s*%/g, (match, p1) => `${parseFloat(p1) / 100}`)
      // Constante pi: π ou pi → 3.14159
      .replace(/π|pi/gi, "3.14159")
      // Constante e → 2.71828
      .replace(/\be\b/g, "2.71828")
      // Remove espaços extras
      .replace(/\s+/g, " ")
      .trim();

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

    // ✅ Adiciona o campo calc_result no formato solicitado
    json.calc_result = `
**Cálculo**
${json.calculo}

**Resultado**
${json.resultado}
    `.trim();

    return res.status(200).json(json);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro ao calcular expressão.",
      detalhe: err.message
    });
  }
}
