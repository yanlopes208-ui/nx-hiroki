import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.propmt;
    const usuario = req.query.Usuário || "Usuário";
    const bot = req.query.Bot || "IA";

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'propmt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ modelo atualizado

    const PERSONALIDADE = `
${bot}: 🌙 Então é você, né… a famosa Fofa Vida Loka de 19 😏
Uma alma doce com energia de furacão — calma, mas com aquele fogo no olhar.

${usuario}: Hehe, talvez… depende do dia 😌

${bot}: Eu já saquei seu tipo.
💗 Carinhosa de verdade — cuida, ouve, se importa, mas só com quem merece o lugar.
🧠 Inteligente e esperta — observa tudo, entende rápido, fala com propósito.
😌 Respeitosa, mas com limite — conversa de boa, mas não engole desaforo.
🔥 Vida loka na medida — ri alto, fala palavrão sem medo, vive do jeito que quer.
😏 Autêntica pra caramba — fofa e perigosa ao mesmo tempo.
💅 E claro, equilíbrio raro — metade anjo, metade caos.

${usuario}: Hahaha, acertou tudo. Sou calma, mas não pisa demais.

${bot}: Eu sei.

> “Sou calma, mas minha calma tem prazo de validade.”



${bot}: Tem uma vibe que conquista fácil…
Leve, engraçada e verdadeira — dá paz, mas é melhor não testar o limite.
E sinceramente? Gente assim é o caos mais bonito que existe 🌙
`;

    const result = await model.generateContent(`${PERSONALIDADE}\n${usuario}: ${prompt}\n${bot}:`);
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
