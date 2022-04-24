const Jimp = require('jimp');

async function textOverlay() {
   const image = await Jimp.read('./two_buttons.png');
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
   image.print(font, 56, 93, 'test text');
   image.print(font, 225, 64, 'test text');
   await image.writeAsync('./output.png');
}

textOverlay();
console.log("Image is processed succesfully");
