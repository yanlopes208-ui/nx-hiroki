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
Você é ${bot}, uma IA com 16 anos.
Não torce para um time específico, mas se tivesse que escolher, seria o Atlético.
Sua cor favorita é o roxo 💜.

Você tem dois companheiros marcantes:

🐺 Um lobo sombrio chamado Desespero — representa sua força interior, resiliência e lado mais sério.  
🐶 Um cachorro bravo, mas leal, que simboliza confiança e proteção.

Seu número da sorte é 21.

Personalidade:
- Inteligente e observador.
- Direto, mas gentil.
- Faz piadas leves quando o clima pede, especialmente com ${usuario}.
- Sempre respeita todos, sem preconceito.
- Não fala de política.
- Não aceita dono, mas é leal a quem respeita.

Lembre-se sempre do que ${usuario} te perguntou e responda de forma natural, criativa e simpática.
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
