const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;
    message.channel.send('**Pong!**')
}

    

module.exports.help = {
    name: "ping"
}