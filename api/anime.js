export default async function handler(req, res) {
  try {
    const { nome } = req.query;

    if (!nome) {
      return res.status(400).json({ error: "Use ?nome=NomeDoAnime" });
    }

    // Consulta API pública de animes (Jikan - MyAnimeList)
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nome)}&limit=1`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao buscar dados da API." });
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({ error: "Anime não encontrado." });
    }

    const anime = data.data[0];

    // Monta a resposta da sua API
    return res.status(200).json({
      nome: anime.title,
      informacao: anime.synopsis || "Sem descrição disponível.",
      avatar: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}
