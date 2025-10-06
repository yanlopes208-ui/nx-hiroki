export default async function handler(req, res) {
  try {
    const { imagem } = req.query;

    if (!imagem) {
      return res.status(400).json({
        error: "Use ?imagem=descrição da imagem",
      });
    }

    // Usa o endpoint alternativo com CORS liberado
    const url = `https://lexica.qwq.link/api/v1/search?q=${encodeURIComponent(imagem)}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao conectar com a API de imagens." });
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0) {
      return res.status(404).json({ error: "Nenhuma imagem encontrada para essa descrição." });
    }

    // Retorna até 3 imagens
    const imagens = data.images.slice(0, 3).map((img) => img.src || img.imageUrl);

    return res.status(200).json({
      descricao: imagem,
      quantidade: imagens.length,
      imagens,
    });
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return res.status(500).json({ error: "Erro interno ao gerar imagem." });
  }
}
