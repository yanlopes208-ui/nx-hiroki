import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

// 🔑 Sua API KEY do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function gerarPokemon(pokeName) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Gere informações detalhadas do Pokémon "${pokeName}" no formato JSON:
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
    "image": "URL da imagem oficial do Pokémon"
  }

  Se o nome não for um Pokémon real, responda: {"erro": "Pokémon não encontrado"}.
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

app.get("/api/pokemon", async (req, res) => {
  const nome = req.query.poke;

  if (!nome) {
    return res.json({ erro: "Use ?poke=nomeDoPokemon" });
  }

  try {
    const data = await gerarPokemon(nome.toLowerCase());
    res.json(data);
  } catch (err) {
    res.json({ erro: "Erro ao gerar dados", detalhe: err.message });
  }
});

app.listen(3000, () => {
  console.log("API de Pokémon com Gemini rodando na porta 3000");
});
