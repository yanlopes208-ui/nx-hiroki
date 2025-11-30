import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const poke = req.query.poke;

  if (!poke) {
    return res.json({ erro: "Use ?poke=nomeDoPokemon" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
    Responda SOMENTE com JSON puro.
    SEM texto adicional.
    SEM markdown.
    SEM comentários fora do JSON.

    Gere informações sobre o Pokémon "${poke}" EXATAMENTE nesse formato:

    {
      "nome": "// Nome do Pokémon",
      "curiosidade": "// Curiosidade sobre o Pokémon",
      "tipo": "/= Tipo(s) do Pokémon",
      "especie": "// Espécie do Pokémon",
      "habilidades": "// Habilidades (incluindo habilidade oculta, se existir)",
      "evolucao": "// Evoluções ou o nome do Pokémon",
      "status": "
HP: valor
Ataque: valor
Defesa: valor
Ataque Especial: valor
Defesa Especial: valor
Agilidade: valor",
      "image": "URL oficial do Pokémon"
    }

    Se o Pokémon não existir, retorne:
    {"erro": "Pokémon não encontrado"}
    `;

    const result = await model.generateContent(prompt);

    let resposta = result.response.text();

    // Remove blocos de código ```json
    resposta = resposta.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      return res.json(JSON.parse(resposta));
    } catch {
      return res.json({
        erro: "Resposta inválida do Gemini",
        respostaBruta: resposta
      });
    }

  } catch (e) {
    return res.json({
      erro: "Erro interno",
      detalhe: e.message
    });
  }
}
