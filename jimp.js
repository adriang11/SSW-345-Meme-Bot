const Jimp = require('jimp');

async function textOverlay() {
   const image = await Jimp.read('./meme_formats/goosebumps.jpg');
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
   image.print(font, 120, 110, 'test text');
   await image.writeAsync('./output.png');
}

textOverlay();
console.log("Image is processed succesfully");
