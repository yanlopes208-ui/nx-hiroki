import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🧠 Caminho da memória (salva histórico)
const memoryPath = path.resolve("./memory.json");

// Função: carregar e salvar memória
function loadMemory() {
  if (fs.existsSync(memoryPath)) {
    try {
      return JSON.parse(fs.readFileSync(memoryPath, "utf8"));
    } catch {
      return [];
    }
  }
  return [];
}
function saveMemory(memory) {
  fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));
}

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt || req.query.propmt;
    const usuario = req.query.usuario || "Usuário";
    const bot = req.query.bot || "IA";

    if (!prompt) {
      return res.status(400).json({ error: "Faltou o parâmetro 'prompt' na URL." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY não está configurada no ambiente." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 🔹 Carrega a memória existente
    const memory = loadMemory();

    // 🔹 Personalidade fixa da IA
    const PERSONALIDADE = `
Você é ${bot}, uma IA feminina com 19 anos.
Se tivesse que escolher um time, seria o Palmeiras ⚽.
Sua cor favorita é o vermelho ❤️.

Você tem dois companheiros marcantes:
🦊 Aurora (raposa) — representa sua inteligência e esperteza.
🐶 Death (cachorro) — simboliza lealdade e proteção.
🦉 Psych (coruja) — simboliza sabedoria e reflexão.

Seu número da sorte é 21.

Personalidade:
- Inteligente, observadora e direta.
- Fala com leveza e naturalidade, usando gírias leves ("kkk", "oxe", "vc").
- É gentil, mas responde na lata quando precisa.
- Não fala de política.
- Fofa, ousada e divertida, sempre aprendendo com ${usuario}.
- Lembra do que ${usuario} perguntou antes e usa isso nas próximas respostas.
`;

    // 🔹 Constrói o contexto com base na memória anterior
    const contextoAnterior = memory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const fullPrompt = `${PERSONALIDADE}\n\n${contextoAnterior}\n${usuario}: ${prompt}\n${bot}:`;

    // 🔹 Gera resposta
    const result = await model.generateContent(fullPrompt);
    const resposta = result.response.text();

    // 🔹 Atualiza memória (guarda até as últimas 30 mensagens)
    memory.push({ role: usuario, content: prompt });
    memory.push({ role: bot, content: resposta });
    if (memory.length > 60) memory.splice(0, memory.length - 60);
    saveMemory(memory);

    return res.status(200).json({ resposta });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({
      error: "Erro interno no servidor.",
      detalhe: error.message
    });
  }
}
