import { GoogleGenerativeAI } from "@google/generative-ai";

let memoriaGlobal = []; // memória viva na RAM

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt || req.query.propmt;
    const usuario = req.query.usuario || "Usuário";
    const bot = req.query.bot || "IA";

    if (!prompt) {
      return res.status(400).json({
        error: "Faltou o parâmetro 'prompt' na URL."
      });
    }

    // 🔒 Limite de caracteres do prompt
    if (prompt.length > 2000) {
      return res.status(400).json({
        error: "Prompt muito grande (máx. 2000 caracteres)."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY não está configurada."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const PERSONALIDADE = `
Você é ${bot}, uma IA feminina com 19 anos.
Fala de forma natural, divertida e curiosa.
Tem uma raposa chamada Aurora 🦊 e um cachorro chamado Death 🐶.
Lembre-se sempre do que ${usuario} perguntou antes.
`;

    // 🧠 Monta memória
    const contextoAnterior = memoriaGlobal
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    const fullPrompt = `
${PERSONALIDADE}
${contextoAnterior}
${usuario}: ${prompt}
${bot}:
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 500, // 🔒 limite da resposta
        temperature: 0.7,
        topP: 0.9
      }
    });

    const resposta = result.response.text();

    // 💾 Salva memória
    memoriaGlobal.push({ role: usuario, content: prompt });
    memoriaGlobal.push({ role: bot, content: resposta });

    // 🔁 Mantém só as últimas 40 mensagens
    if (memoriaGlobal.length > 100) {
      memoriaGlobal.splice(0, memoriaGlobal.length - 150);
    }

    return res.status(200).json({ resposta });

  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({
      error: "Erro interno",
      detalhe: error.message
    });
  }
}
