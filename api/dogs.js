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
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454275244339499151/images_20.jpg?ex=69507edd&is=694f2d5d&hm=162cdf4521d10961b3b91907cdea6224252e862adc1018a5f61f91c051a19214&"
  ];

  const randomDog = dogs[Math.floor(Math.random() * birds.length)];

  res.status(200).json({
    author: "Cachorros Random",
    imagem: randomDog
  });
}
