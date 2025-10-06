export default function handler(req, res) {
  const memes = [
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538809245106297/images_88.jpg?ex=68e42a47&is=68e2d8c7&hm=a7497d4c4a828d4911dde981b7b0c1fa77def4471c0a4d2709773a20ab72d4d1&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538809576591542/images_89.jpg?ex=68e42a47&is=68e2d8c7&hm=f56f6dd761097572fe4fe504dab09618a0a3cfda0e9ef450b530fb2f150fce2e&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810142818476/images_90.jpg?ex=68e42a48&is=68e2d8c8&hm=3b0b0f76a7340bcf09e8c092551d5374af4074e13dcdfb6b6eefd16b0705d512&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810490818560/images_91.jpg?ex=68e42a48&is=68e2d8c8&hm=f3d0ea8938cccc9a7b563940c7128886a1ff92120e8c6c1f073eba156c226372&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810973032528/images_92.jpg?ex=68e42a48&is=68e2d8c8&hm=03f50a5a1e207bdb5a25841a3bee41cf6ec177eb95c26146aef4899f6c6dc0a1&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538811312766976/images_93.jpg?ex=68e42a48&is=68e2d8c8&hm=29419074b5dce69b8a8cab2d44bba85f5c5116eb2f6529399dad4fa5255a0629&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538811728265377/images_94.jpg?ex=68e42a48&is=68e2d8c8&hm=d33ab1edc8383e5fce3c931dc1ef58350cd4388767c8026f3ea9aacfe55f12f8&"
  ];

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  res.status(200).json({
    author: "GPT Meme API",
    meme: randomMeme
  });
}
