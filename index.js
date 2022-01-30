const Discord = require('discord.js')

const { Client, Intents, Collection } = require('discord.js')

const config = require('./config.json');

const client = new Client({
     partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_BANS],
     allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
    });

const fs = require('fs');

client.commands = new Discord.Collection();


fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("❌ Can't find any commands!");
          return;
        }

        
        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`)
            try {
                client.commands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

client.on("messageCreate", async message => {

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    let commands = client.commands.get(cmd.slice(prefix.length))

    if(commands) commands.run(client, message, args, prefix);
})

// Login To Discord with your app's Token

client.login(config.token);
