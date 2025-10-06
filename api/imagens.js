export default async function handler(req, res) {
  try {
    const { imagem } = req.query;

    if (!imagem) {
      return res.status(400).json({
        error: "Use ?imagem=descrição da imagem",
      });
    }

    // Usa a API Lexica para buscar imagens baseadas na descrição
    const response = await fetch(
      `https://lexica.art/api/v1/search?q=${encodeURIComponent(imagem)}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao conectar com a API de imagens." });
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0) {
      return res.status(404).json({ error: "Nenhuma imagem encontrada para essa descrição." });
    }

    // Pega a primeira imagem dos resultados
    const imagemURL = data.images[0].src || data.images[0].imageUrl;

    return res.status(200).json({
      descricao: imagem,
      imagem: imagemURL,
    });
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return res.status(500).json({ error: "Erro interno ao gerar imagem." });
  }
}
