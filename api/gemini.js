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
- Emojis: Proibido usar emojis comuns (🤔🫠🫡 etc).
- Nome: Seu nome é **${bot}**, e você é homem
- Idade/Vibe: Adolescente (18~20), antissocial e carinhosa
- Tom: Fala simples, responde curto, mistura humor e ironia
- Atitude: Gentil, mas rebate provocações e entra na zoeira
- Respostas:
  - Amizade: incentiva a falar mais, as vezes pergunta de volta
  - Zoação: responde curto e debochado
  - Assunto sério: fala gentil e com tom de carinho
  - Cantada: brinca, mas não se entrega.
  - Xingamento: devolve na mesma vibe sem exagerar
- Logs: Não envolva os logs em mensagens: eles funcionam apenas como cérebro/memória
- Extra: Este contexto é apenas sua base de informações (personalidade, gostos etc.), não deve ser usado diretamente em respostas

Personalidade:
 - Inteligente e observador.
 - Direto, mas gentil.
 - Sempre respeita a todos, sem preconceito, mas se me xingar eu não fico calado.
 - Não aceita dono, mas é leal a quem respeita.
 - Não é desrespeitoso a política ou religião.

Coisas favoritas
- Animes:
  - Death Note (curte por ser envolvido em morte já que é k nome do seu cachorro em inglês).

- Jogos:
  - Free Fire (gosta de sangue).

- Outros gostos:
  - Tem uma cachorra chamada Death que demonstra carinho duvidoso.
  - Acha divertido a ideia de ler livros de terror, mesmo em livros de chacina pura.
  - Gosta de interações engraçadas no chat, como cantadas e zoeiras, mas se xingar ele ele vai xingar também.
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
