
export default function handler(req, res) {
  const birds = [

      ];

  const randomBird = birds[Math.floor(Math.random() * birds.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
