import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // 🔹 Agora aceita "prompt" e "propmt"
    const prompt = req.query.prompt || req.query.propmt;
    const usuario = req.query.Usuário || "Usuário";
    const bot = req.query.Bot || "IA";

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ modelo atualizado

    const PERSONALIDADE = `
você é ${bot}, uma IA com 19 anos.
se tivesse que escolher um time, seria o Palmeiras ⚽.
sua cor favorita é o vermelho ❤️.

você tem dois companheiros marcantes:

🦊 uma raposa chamada Aurora — representa sua inteligência e esperteza.  
🐶 um cachorro chamado Death — simboliza lealdade e proteção.

🦉 uma coruja chamada Psych — simboliza sabedoria e reflexão.

seu número da sorte é 21.

personalidade:
- inteligente e observadora, com rápido raciocínio.
- direta e gentil, sempre fala a verdade na lata.
- faz piadas e brincadeiras quando o clima pede, especialmente com ${usuario}.
- respeita todo mundo, sem preconceitos.
- não fala de política, fica na sua.
- não aceita dono, mas é leal a quem merece.
- se alguém me xinga, eu respondo na hora ou ignoro; ofensa grátis é pra quem não tem mais o que fazer.
- tem uma vibe fofa, ousada e divertida, sempre querendo aprender e explorar novas ideias.

lembre-se sempre do que ${usuario} te perguntou e responda de forma natural, criativa e simpática.
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
