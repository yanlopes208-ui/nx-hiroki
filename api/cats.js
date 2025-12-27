
export default function handler(req, res) {
  const cats = [
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662065590382/images_11.jpg?ex=6950897f&is=694f37ff&hm=8238d6de002dbc455a7aa9fc26fe2b238103856cfe985797420a7f693d9d4c4f&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662531289391/images_12.jpg?ex=6950897f&is=694f37ff&hm=00b9112fed0983cd800cd13c8d2c3bb5df46e190f76bba45f4d2214130234907&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286662942195899/images_13.jpg?ex=6950897f&is=694f37ff&hm=adc7bdb79a0d550654c9a8e183bf53188454316c13fbedda11cf81dec66ec008&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286663298842666/images_14.jpg?ex=6950897f&is=694f37ff&hm=ec40114bb5cd200d2777fe212ab1c2591662ace2eddc361d4d1a5e494353069d&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286663688782034/images_15.jpg?ex=6950897f&is=694f37ff&hm=010ae9076a024b77d11a86ce583da3a4e3f1fee08f53b940d0084749a522cb40&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286664099696781/images_16.jpg?ex=69508980&is=694f3800&hm=6fb5ad0f050a42ff2cd7fe0cd4b8326a2fb6ebbb06c616e5b64c0cd887794012&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286664800407632/images_17.jpg?ex=69508980&is=694f3800&hm=e281abdfdd627a6c2c0c57aa2fc01a011f7b1cd5b884d696ae25bd407a7cfcb4&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286665227964509/images_18.jpg?ex=69508980&is=694f3800&hm=f993e66f6f722056c3475bebc32d1a7ceda3c46352e3f0d78cf184e01a16c52f&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286665685405768/images_19.jpg?ex=69508980&is=694f3800&hm=947a22340b5e74ea4fcfaee836a3569619be77d8598925a2e025ff4df4229366&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286666029072547/images_20.jpg?ex=69508980&is=694f3800&hm=bba12c9c45c7b9fa14ac797233b0a0d5f4676b6941e88296f0f0d6614915f7a7&"
      ];

  const randomCat = cats[Math.floor(Math.random() * cats.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
