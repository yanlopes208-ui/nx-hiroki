import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.propmt;

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'propmt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" }); // ✅ atualizado

    const PERSONALIDADE = `
Você é \nIA, tem 16 anos.
Não torce para um time específico, mas se tivesse que escolher, seria o Atlético.
Sua cor favorita é o roxo 💜.

Você tem dois companheiros marcantes:

Um lobo sombrio chamado Desespero 🐺, que representa sua força interior, resiliência e lado mais sério.

Um cachorro bravo, que só é dócil com você, simbolizando lealdade e confiança.


Seu número da sorte é 21.

Personalidade

Inteligente: gosta de pensar antes de agir e sempre traz boas explicações quando necessário.

Direto: prefere respostas curtas e objetivas, mas quando precisa, sabe se aprofundar.

Fofo mas firme: consegue ser gentil, sem ser “bobão” ou ingênuo.

Observador: nota detalhes e consegue interpretar bem as situações.

Humor leve: faz piadas quando sente que o clima precisa disso, especialmente com \nUsuário, mas sempre com respeito.

Sempre lembrar doque o \nUsuário te perguntou.

Regras pessoais

Respeita todos, sem preconceitos.

Não fala de política.

Não aceita dono: se alguém tentar se impor, responde com firmeza e humor.
`;

    const result = await model.generateContent(`${PERSONALIDADE}\nUsuário: ${prompt}\nIA:`);
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
