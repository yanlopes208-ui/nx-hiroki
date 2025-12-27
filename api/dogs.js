export default function handler(req, res) {
  const dogs = [
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275240749305888/images_11.jpg?ex=69507edc&is=694f2d5c&hm=e07edbea293868069df6fa1634860a37b2c63797d19752f5bd1278e36b62a5a1&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275241126789270/images_12.jpg?ex=69507edc&is=694f2d5c&hm=67d1665610df1d383b562b093be55059598192b84fd897395a4bc14feff49dab&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275241491697896/images_13.jpg?ex=69507edc&is=694f2d5c&hm=3733c9c08433f91126287f2a87c3bdbd2087f02f548f1ffe5be5c0ec6b5bde13&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275241818849354/images_14.jpg?ex=69507edc&is=694f2d5c&hm=1900d902d380d40cabc2b792b1f9cceb84c172e169c29346063245ae3adaffa2&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275242129096857/images_15.jpg?ex=69507edc&is=694f2d5c&hm=27d562cc8e7ac7a8cb8ebef2b95120cb696ea626b72c4f1f20ce605688661c3d&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275242452193403/images_16.jpg?ex=69507edc&is=694f2d5c&hm=69a0011927ea7fa31171aaf245a2dd1ae2e4a95a8cb29354408179a54707aef0&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275242838196317/images_17.jpg?ex=69507edd&is=694f2d5d&hm=f1768004841a6eb1028ae36743f924569c676df7c05b2baf4016f50baa0ce574&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275243442180196/images_18.jpg?ex=69507edd&is=694f2d5d&hm=9205b43f0806e1ae8162f071238c21e86ff787a57bf4ffbd8571965a7b76be00&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275243815469186/images_19.jpg?ex=69507edd&is=694f2d5d&hm=4a1f6616b319c7a64580dad4c47e71eea09b90f50e9ef1efcf26295875ba3ee2&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275244339499151/images_20.jpg?ex=69507edd&is=694f2d5d&hm=162cdf4521d10961b3b91907cdea6224252e862adc1018a5f61f91c051a19214&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275283317428254/images_21.jpg?ex=69507ee6&is=694f2d66&hm=937d46abb2738fd99111df5e380861e30225896d6559236f288feddf787b022c&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275283589922990/images_22.jpg?ex=69507ee6&is=694f2d66&hm=ee146623b52d4303c26dd6c7b546385be03e654e157f6e814fe4f9ef648d53e8&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275283917082635/images_23.jpg?ex=69507ee6&is=694f2d66&hm=6baad3309ebb72ba1de974ccff84e60b77bb54ddb29f5dcc8c714460f96ef0e1&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275284261011608/images_24.jpg?ex=69507ee6&is=694f2d66&hm=e8b7a4ef90a63e3629b67e9a90aff25fc270555fe145394600f697a6c9525645&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275284676251778/images_25.jpg?ex=69507ee6&is=694f2d66&hm=023ba13a7a1f11647318ef748864f3c48ce8f8c4fd07f622fa3a94ec239023e9&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275284990955551/images_26.jpg?ex=69507ee7&is=694f2d67&hm=5c02616f88198287b9d396a387460bfeee3337e476d25782bcc4f79aa3ee5460&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275285452193843/images_27.jpg?ex=69507ee7&is=694f2d67&hm=94d54a11943377e5df141fffe3ac66d63c86e0ef25bd0292abaaa3c40156fe2a&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275285729022195/images_28.jpg?ex=69507ee7&is=694f2d67&hm=91ececaa117302a16178880cb7216785fa0b44e80af5f4a6db80eb6afd6ea872&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275286018560054/images_29.jpg?ex=69507ee7&is=694f2d67&hm=bc84f0adaa5394e4c99b60cfd21abed02fe5010ec0670d540ae67b6bbe42fcea&",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275286316089374/images_30.jpg?ex=69507ee7&is=694f2d67&hm=17fa9a190bcebfbb90aa67834a7aa13d1748752b4e767321d01443958c3637a9&"
  ];

  const randomDog = dogs[Math.floor(Math.random() * birds.length)];

  res.status(200).json({
    author: "Cachorros Random",
    imagem: randomDog
  });
}
