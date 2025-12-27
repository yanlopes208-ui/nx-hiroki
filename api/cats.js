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
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454286666029072547/images_20.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944215224483/images_21.jpg?ex=695189df&is=6950385f&hm=0a09b1d1cc5b31aab4269a7bdb11b52a2f04f901f8fa2b0afb7733fa54e962d4&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944567681095/images_22.jpg?ex=695189e0&is=69503860&hm=35d31b43b353decd89c7d1dd0cb5358f5b1d54326c83240463f160f10ae8a96c&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944878186516/images_23.jpg?ex=695189e0&is=69503860&hm=288f8adf87421c1df0d1bdca68248e5f4be10981023859c64ed234699b2eb0f7&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561945192497193/images_24.jpg?ex=695189e0&is=69503860&hm=26fc6b529457fe7642d05640f7e7ba707274ab9d8fa49a14c34a8a9eac7bab38&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561945524113580/images_25.jpg?ex=695189e0&is=69503860&hm=fc3942f65945ae05da623819fe6f4e47c00e0f83c4214e5ce09dda4912e3318f&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946010648596/images_26.jpg?ex=695189e0&is=69503860&hm=1eee854712edd5feeaf9a7679153a5285f0267f19c00048bc8afaaaa05982597&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946387873947/images_27.jpg?ex=695189e0&is=69503860&hm=6c599dea95a5f4263fb50bb94cb75ec28d49a02d1005b8b91e3bafae35c9c524&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946954109069/images_28.jpg?ex=695189e0&is=69503860&hm=cc999f527ca80ac497093c878da0dfac37acec43e939933719e123c8e76d2bd6&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561947319009291/images_29.jpg?ex=695189e0&is=69503860&hm=91d9a00724d3a755bab05063c6f0ca4b327891552994ff354fcd24da73cb3c45&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561947616940206/images_30.jpg?ex=695189e0&is=69503860&hm=aae2f7f0f8bb758c262cd372fcfe2a57e45aa7375439ba42d6fcaebdcb92bfe5&"
  ];

  const randomCat = cats[Math.floor(Math.random() * cats.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
