const Discord = require('discord.js');

const client = new Discord.Client();

require('dotenv').config();

client.once('ready', () => {
    console.log('Bot is online!');
})

client.on('message', message =>{
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if(command === 'meme'){
        message.channel.send('lol')
        
        //do something
    }
})

client.login(process.env.TOKEN);