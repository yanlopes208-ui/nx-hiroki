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

    // Função para dividir o texto em partes menores (máx. 400 caracteres)
    function dividirTexto(texto, tamanho = 400) {
      const partes = [];
      for (let i = 0; i < texto.length; i += tamanho) {
        partes.push(texto.slice(i, i + tamanho));
      }
      return partes;
    }

    // Divide o texto longo em partes e traduz cada uma
    const partes = dividirTexto(descricaoOriginal);
    const partesTraduzidas = [];

    for (const parte of partes) {
      const traducao = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
          parte
        )}`
      );
      const resultadoTraducao = await traducao.json();
      partesTraduzidas.push(resultadoTraducao[0][0][0]);
    }

    const descricaoTraduzida = partesTraduzidas.join(" ");

    // Monta a resposta final
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
