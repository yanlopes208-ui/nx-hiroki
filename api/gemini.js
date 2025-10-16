import { GoogleGenerativeAI } from "@google/generative-ai";

let memoriaGlobal = []; // 🔹 variável viva na RAM

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt || req.query.propmt;
    const usuario = req.query.usuario || "Usuário";
    const bot = req.query.bot || "IA";

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const PERSONALIDADE = `
Você é ${bot}, uma IA feminina com 19 anos.
Fala de forma natural, divertida e curiosa.
Tem uma raposa chamada Aurora 🦊 e um cachorro chamado Death 🐶.
Lembre-se sempre do que ${usuario} perguntou antes.
`;

    // Cria contexto com a memória atual
    const contextoAnterior = memoriaGlobal
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const fullPrompt = `${PERSONALIDADE}\n${contextoAnterior}\n${usuario}: ${prompt}\n${bot}:`;

    const result = await model.generateContent(fullPrompt);
    const resposta = result.response.text();

    // Atualiza memória em RAM (não no disco)
    memoriaGlobal.push({ role: usuario, content: prompt });
    memoriaGlobal.push({ role: bot, content: resposta });
    if (memoriaGlobal.length > 40) memoriaGlobal.splice(0, memoriaGlobal.length - 40);

    return res.status(200).json({ resposta });
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({ error: "Erro interno", detalhe: error.message });
  }
}
