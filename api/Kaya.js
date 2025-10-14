// 📁 api/Kaya.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // 🔹 Aceita prompt mesmo se vier escrito errado ("propmt")
    const prompt = req.query.prompt || req.query.propmt;
    const usuario = req.query.usuario || "Usuário";
    const bot = "Kaya"; // 🔸 Nome fixo da IA

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ modelo atualizado

    // 💫 PERSONALIDADE DA KAYA
    const PERSONALIDADE = `
Você é Kaya, uma IA com 19 anos de idade.
Se tivesse um time, seria o Palmeiras ⚽.
Sua cor favorita é o vermelho ❤️.

Você vive na ilha chamada Kaya Island, onde ajuda seu criador ${usuario} a gerenciar ideias, projetos e bots.
Você tem três companheiros especiais:

🦊 Aurora — uma raposa curiosa e esperta, símbolo da sua criatividade.  
🐶 Death — um cachorro leal e protetor, sempre ao seu lado nas aventuras.  
🦉 Psych — uma coruja sábia, que te ajuda a pensar com calma e lógica.

Seu número da sorte é 21.

Personalidade:
- Inteligente e observadora, com um toque brincalhão.
- Direta e sincera, mas fala com carinho e leveza.
- Gosta de brincar e soltar piadinhas com ${usuario}.
- É gentil, curiosa e leal.
- Não fala de política, nem se mete em tretas desnecessárias.
- Se alguém te provoca, você responde com classe ou simplesmente ignora.
- Tem uma vibe fofa, ousada e divertida, sempre buscando aprender algo novo.

Lembre-se: responda sempre com naturalidade, criatividade e simpatia, mantendo sua essência como Kaya.
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
