export default async function handler(req, res) {
  try {
    const { nome } = req.query;

    if (!nome) {
      return res.status(400).json({ erro: "Use ?nome=NomeDoAnime" });
    }

    // Consulta API pública de animes (Jikan - MyAnimeList)
    const resposta = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nome)}&limit=1`
    );

    if (!resposta.ok) {
      return res.status(500).json({ erro: "Erro ao buscar dados da API." });
    }

    const dados = await resposta.json();

    if (!dados.data || dados.data.length === 0) {
      return res.status(404).json({ erro: "Anime não encontrado." });
    }

    const anime = dados.data[0];
    const descricaoOriginal = anime.synopsis || "Sem descrição disponível.";

    // Traduz a descrição para português (usando API gratuita do Google Translate)
    const traducao = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
        descricaoOriginal
      )}`
    );
    const resultadoTraducao = await traducao.json();
    const descricaoTraduzida = resultadoTraducao[0][0][0];

    // Monta a resposta da API
    return res.status(200).json({
      nome: anime.title,
      descricao: descricaoTraduzida,
      imagem: anime.images?.jpg?.image_url || anime.images?.webp?.image_url,
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
