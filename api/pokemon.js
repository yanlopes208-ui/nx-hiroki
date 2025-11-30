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
    Responda SOMENTE com JSON puro. Sem texto extra.

    Gere informações do Pokémon "${poke}" no formato:

    {
      "nome": "",
      "curiosidade": "",
      "tipo": [],
      "especie": "",
      "habilidades": [],
      "evolucao": [],
      "status": {
        "HP": 0,
        "Attack": 0,
        "Defense": 0,
        "AttackSpecial": 0,
        "DefenseSpecial": 0,
        "Agility": 0
      },
      "image": ""
    }

    Se o Pokémon não existir:
    {"erro": "Pokémon não encontrado"}
    `;

    const result = await model.generateContent(prompt);

    let resposta = result.response.text();

    // remove ```json , ``` e espaços quebrados
    resposta = resposta.replace(/```json/g, "").replace(/```/g, "").trim();

    let jsonFinal;

    try {
      jsonFinal = JSON.parse(resposta);
    } catch {
      return res.json({
        erro: "Resposta inválida do Gemini",
        respostaBruta: resposta
      });
    }

    res.status(200).json(jsonFinal);

  } catch (e) {
    res.status(500).json({
      erro: "Erro interno",
      detalhe: e.message
    });
  }
}
