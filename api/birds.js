export default function handler(req, res) {
  const birds = [
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246888277807242/images_11.jpg?ex=69506474&is=694f12f4&hm=25afced8735ebfe6612dd1ab75344a5f9ac3028614919e3926376f6c0d6f9808&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246888684388352/images_12.jpg?ex=69506474&is=694f12f4&hm=d31774229c8f9ad093fba31f9b3e42ba01193bb57ff749eea5b59cb4a53f0688&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246889171062815/images_13.jpg?ex=69506474&is=694f12f4&hm=6629e107887a7572a29ba970e8bb289718fd16470ad511dec9817d14bb52114f&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246889569386587/images_14.jpg?ex=69506475&is=694f12f5&hm=a4f9049e5e457e8338400e051c89f985a2779f572c53f1759e7e8bc8d08417ba&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246889980432538/images_15.jpg?ex=69506475&is=694f12f5&hm=74a56c31528913239fcda228a04bfb86ed0a9fb3ab63d75e4997c77372e21e78&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246890324496546/images_16.jpg?ex=69506475&is=694f12f5&hm=863b03c7be842730428bffb78a509220204683343efc1a945e4c616675074f63&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246890978676900/images_17.jpg?ex=69506475&is=694f12f5&hm=68135dcaa6303562a7d267052e0799495b0ed41b3d8fe4ae0279f5a159d9b12e&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454246891394044147/images_18.jpg?ex=69506475&is=694f12f5&hm=5fb1610f595173b98a2efe24f4f3127acca9e343b736b488eb79256fd7503af9&"
  ];

  const randomBird = birds[Math.floor(Math.random() * birds.length)];

  res.status(200).json({
    author: "Pássaros Random",
    meme: randomBird
  });
}
