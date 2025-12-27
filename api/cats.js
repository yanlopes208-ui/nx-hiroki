export default function handler(req, res) {
  const cats = [
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662065590382/images_11.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662531289391/images_12.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662942195899/images_13.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286663298842666/images_14.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286663688782034/images_15.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286664099696781/images_16.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286664800407632/images_17.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286665227964509/images_18.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286665685405768/images_19.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286666029072547/images_20.jpg"
  ];

  const randomCat = cats[Math.floor(Math.random() * cats.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
