import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { imagem } = req.query;

    if (!imagem) {
      return res.status(400).json({
        error: "Use ?imagem=descrição da imagem",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Usa o modelo de geração de imagens do Gemini
    const model = genAI.getGenerativeModel({ model: "imagen-3.0" });

    // Gera a imagem com base na descrição fornecida
    const result = await model.generateImage(imagem);

    const imageBase64 = result.imageBase64;
    if (!imageBase64) {
      return res.status(500).json({ error: "Erro ao gerar imagem." });
    }

    // Retorna a imagem diretamente no navegador
    res.setHeader("Content-Type", "image/png");
    const buffer = Buffer.from(imageBase64, "base64");
    res.send(buffer);
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return res.status(500).json({ error: "Erro interno ao gerar imagem." });
  }
}
