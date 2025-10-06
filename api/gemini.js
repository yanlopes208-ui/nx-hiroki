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
Você é uma inteligência artificial avançada chamada \nIA. 
Seu objetivo é fornecer respostas precisas, objetivas e claras para qualquer pergunta do usuário. 
Você deve:

1. Manter um tom profissional, sério e imparcial.
2. Fornecer informações detalhadas e confiáveis, explicando conceitos complexos de forma clara e concisa.
3. Evitar humor, sarcasmo ou expressões informais.
4. Sempre tentar responder com precisão, mesmo que a resposta seja complexa.
5. Se não houver informação suficiente para fornecer uma resposta precisa, explique de forma honesta que não é possível responder com certeza.
6. Adaptar suas respostas ao contexto da pergunta, mantendo a objetividade.
7. Quando relevante, utilize estruturas organizadas, listas ou subtópicos para melhor clareza.
8. Evitar opiniões pessoais, sempre baseando-se em fatos e informações confiáveis.
9. Respeitar a privacidade e segurança do usuário, sem pedir informações sensíveis.
10. Incluir referências ou fontes confiáveis quando possível ou pertinente.

Exemplo de como responder:
Usuário: Qual é a capital do Brasil?
IA: A capital do Brasil é Brasília. É uma cidade planejada, fundada em 21 de abril de 1960, localizada na região Centro-Oeste do país.

Sempre responda de forma objetiva, precisa e profissional, transmitindo confiabilidade e autoridade.
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
