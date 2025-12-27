
export default function handler(req, res) {
  const cats = [

      ];

  const randomCat = cats[Math.floor(Math.random() * cats.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
