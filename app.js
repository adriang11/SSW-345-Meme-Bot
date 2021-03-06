const Discord = require('discord.js')
const csv = require('csv-parser')
const fs = require('fs')
const Jimp = require('jimp')
const wait = require('util').promisify(setTimeout)

const client = new Discord.Client()

require('dotenv').config()
require('discord-reply')

let state = 1

async function textOverlay(coords, strings, img_name, color) {
  const image = await Jimp.read('./meme_formats/' + img_name)
  let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
  if (color === "white") {
    font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
  }
  for (let i = 0; i < coords.length; i++) {
    image.print(font, coords[i][0], coords[i][1], strings[i])
  }
  await image.writeAsync('./output.png')
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

async function make_image(strings) {
  console.log(strings)
  let results = []
  let options = []
  let coords_final = []
  fs.createReadStream('images.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (var i = 0; i < results.length; i++) {
      if (parseInt(results[i].string_count) === strings.length) {
        options.push(results[i])
      }
    }
    final = getRandomInt(options.length)
    console.log(options[final])

    let coordinates = options[final].coords
    let coords_arr = coordinates.split(',')

    let coords_arr_num = coords_arr.map(str => {
      return Number(str)
    })

    const chunkSize = 2;
    for (let i = 0; i < coords_arr_num.length; i += chunkSize) {
      const chunk = coords_arr_num.slice(i, i + chunkSize)
      coords_final.push(chunk)
    }

    textOverlay(coords_final, strings, options[final].image, options[final].color)
  });
}

client.once('ready', () => {
  console.log('Bot is online!')
})

client.on('message', async message => {
  try {
    const input = message.content.trim()
    if (!input.startsWith(process.env.PREFIX) || message.author.bot) return

    const regex = new RegExp('"[^"]+"|[\\S]+', 'g')
    const arguments = []
    input.match(regex).forEach(element => {
        if (!element) return
        return arguments.push(element.replace(/"/g, ''))
    })

    const args = arguments 
    const command = args.shift().toLowerCase()
    const params = args.map(clean)

    function clean(value, index, array) {
      return value.replace(/^"|^'|'$|"$/g, '')
    }

    if (command === '!meme') {
      if (state === 1) {
        state = 0
        const image = make_image(params)
        message.channel.send("Creating meme... please wait until this meme is done to make another.")
        await wait(3000)
        message.lineReply("Your meme:", {files: ['./output.png']})
        state = 1
      }
      if (state === 0) {
        message.channel.send("Creating another meme currently, please wait until the current meme is finished.")
      }
    }
  } catch (error) {
    console.log(error)
  }
})

client.login(process.env.TOKEN)
