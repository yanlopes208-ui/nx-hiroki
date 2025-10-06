export default function handler(req, res) {
  const memes = [
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538809245106297/images_88.jpg?ex=68e42a47&is=68e2d8c7&hm=a7497d4c4a828d4911dde981b7b0c1fa77def4471c0a4d2709773a20ab72d4d1&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538809576591542/images_89.jpg?ex=68e42a47&is=68e2d8c7&hm=f56f6dd761097572fe4fe504dab09618a0a3cfda0e9ef450b530fb2f150fce2e&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810142818476/images_90.jpg?ex=68e42a48&is=68e2d8c8&hm=3b0b0f76a7340bcf09e8c092551d5374af4074e13dcdfb6b6eefd16b0705d512&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810490818560/images_91.jpg?ex=68e42a48&is=68e2d8c8&hm=f3d0ea8938cccc9a7b563940c7128886a1ff92120e8c6c1f073eba156c226372&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538810973032528/images_92.jpg?ex=68e42a48&is=68e2d8c8&hm=03f50a5a1e207bdb5a25841a3bee41cf6ec177eb95c26146aef4899f6c6dc0a1&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538811312766976/images_93.jpg?ex=68e42a48&is=68e2d8c8&hm=29419074b5dce69b8a8cab2d44bba85f5c5116eb2f6529399dad4fa5255a0629&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538811728265377/images_94.jpg?ex=68e42a48&is=68e2d8c8&hm=d33ab1edc8383e5fce3c931dc1ef58350cd4388767c8026f3ea9aacfe55f12f8&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538812084785182/images_95.jpg?ex=68e42a48&is=68e2d8c8&hm=fd0cbb0f9ee97174ca449ce23c586eacfc05530919b865db2058b9dfcf46f63b&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538812512600105/images_96.jpg?ex=68e42a48&is=68e2d8c8&hm=2337a830ca260fcd8342ccf0d7b2661d9dd4e77dde4b3a8a0d231d06e9888a88&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538812994818140/images_97.jpg?ex=68e42a48&is=68e2d8c8&hm=a873e86fc2c619ff926e7362d13396e2583b57279db10b4ac6591acb0d4ba222&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538846973005988/images_98.jpg?ex=68e42a50&is=68e2d8d0&hm=eec3ba5f0cd747c1ef744875685920c3ceeb9fe5dcac7244365aff08da45d4fe&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538847446827048/images_99.jpg?ex=68e42a50&is=68e2d8d0&hm=2582bf8861f7951ee129895f664f202ffe70c16343e34575ed7757ec178f8356&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538847954473152/images_100.jpg?ex=68e42a51&is=68e2d8d1&hm=b2c73d82409fcaea483859671fd26fafb49a3e7caa4286578635b9a25c96047c&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538848382025808/images_-_2025-09-02T174339.525.jpg?ex=68e42a51&is=68e2d8d1&hm=9142e4522559f20328fca56dd7a5d9358616b3f0e40e3fb4e4f0fef6428b6abe&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538848944197719/images_-_2025-09-02T174346.931.jpg?ex=68e42a51&is=68e2d8d1&hm=a9cf56d6aa1351a0f9e7c2b66fe552079e209bf9ec2004d34ae03fac8d858428&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538849287995573/images_-_2025-09-02T174354.306.jpg?ex=68e42a51&is=68e2d8d1&hm=b05189e984c6beaa599adee51e80dabe5bfc510a4cef4bbb2b2a9dc00b6e6b02&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538849669812244/download_33.jpg?ex=68e42a51&is=68e2d8d1&hm=974b93c973775765fdcdef9470fb43fdbaa67808b3b1079ad27c7ce25cafdd06&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538850017935440/download_34.jpg?ex=68e42a51&is=68e2d8d1&hm=7fbce297a90dce569630fa6fef1ff8f9fd01a54d8afa7037e151cf29b59f4e2f&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412538850370261103/download_35.jpg?ex=68e42a51&is=68e2d8d1&hm=18e9a8ece4c2ecd0e6ecfa49d5493e6b4c5538e85e1320e7f65542167a97d695&",
    "https://cdn.discordapp.com/attachments/1393626963490373632/1412539698899058738/images_-_2025-09-02T174524.330.jpg?ex=68e42b1b&is=68e2d99b&hm=bbbe8232c4319247e5b173256e4e066974206fda0600059b0306c4a625464f81&"
  ];

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  res.status(200).json({
    author: "GPT Meme API",
    meme: randomMeme
  });
}
