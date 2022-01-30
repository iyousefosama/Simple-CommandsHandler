const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;
    await message.channel.send('Starting...')

    for(let i = 1; i <= 10; i++) {
    await new Promise(r=>setTimeout(r,5000))
    message.channel.send(`Working on account number **${i}** Now!`)
    await new Promise(r=>setTimeout(r,1000))
    message.channel.send(`!c${i}`)


    const filter = msg => msg.author.id == '681146368361889905';
    const filter2 = msg => msg.author.id == '681146368361889905';
    let col = await message.channel.awaitMessages({ filter, max: 1})
    if(col.first().content == 'cancel') return await message.channel.send({ content: `<:error:888264104081522698>  **|** **${message.author.tag}**, Cancelled the command!`})
    credits = col.first().content

    const regex = /\d+/gm;
    const str = credits;
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        message.channel.send('Got it! waiting for the cooldown...')
        await new Promise(r=>setTimeout(r,10000))
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`)
            message.channel.send(`!t${i} ${match}`).catch(() => null)
        });
    }

    

    message.channel.send(`${message.author}, Please type the captcha you got!`)
    await new Promise(r=>setTimeout(r,5000))
    let col2 = await message.channel.awaitMessages({ filter2, max: 1})
    cap = col2.first().content
    if(col2.first().content == 'cancel') return message.channel.send({ content: `<:error:888264104081522698>  **|** **${message.author.tag}**, Cancelled the command!`})

    message.channel.send(`!s${i} ${cap}`)
}
}

    

module.exports.help = {
    name: "start"
}