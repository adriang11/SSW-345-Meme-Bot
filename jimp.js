const Jimp = require('jimp');

async function textOverlay() {
   const image = await Jimp.read('./meme_formats/yoda.jpg');
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
   image.print(font, 150, 500, 'test text');
   await image.writeAsync('./output.png');
}

textOverlay();
console.log("Image is processed succesfully");
