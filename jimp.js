const Jimp = require('jimp');

async function textOverlay() {
   const image = await Jimp.read('./meme_formats/drifting_exit.jpg');
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
   image.print(font, 420, 170, 'test text');
   await image.writeAsync('./output.png');
}

textOverlay();
console.log("Image is processed succesfully");
