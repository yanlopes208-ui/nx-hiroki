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
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944215224483/images_21.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944567681095/images_22.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561944878186516/images_23.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561945192497193/images_24.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561945524113580/images_25.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946010648596/images_26.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946387873947/images_27.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561946954109069/images_28.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561947319009291/images_29.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454561947616940206/images_30.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562004042780753/images_31.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562004323795229/images_32.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562004726714408/images_33.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562005053608047/images_34.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562005376565258/images_35.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562005792067758/images_36.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562006223818903/images_37.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562006614016091/images_38.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562007012347964/images_39.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562007343693998/images_40.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562065795514568/images_41.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562066345099266/images_42.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562066948952065/images_43.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562067825824001/images_44.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562068098191471/images_45.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562068375011349/images_46.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562068781863075/images_47.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562069222260969/images_48.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562075207794922/images_49.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562076025425930/images_50.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562080698007612/images_51.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562080966316109/images_52.jpg",
    "https://cdn.discordapp.com/attachments/1417374543609204866/1454562081222299895/images_53.jpg"
  ];

  const randomCat = cats[Math.floor(Math.random() * cats.length)];

  res.status(200).json({
    author: "Gatos Random",
    imagem: randomCat
  });
}
