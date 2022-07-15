const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// get prefix of message and token from auth.json file
const auth = require('./auth.json');
// impelement youtube core library
const ytdl = require('ytdl-core');

// listener status of server
client.once("ready", () => {
    console.log("Logged in as " + client.user.tag + "!");
    console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

// checking user command
client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(auth.prefix)) return;
    const [commandName, ...args] = message.content.trim().substring(auth.prefix.length).split(/\s+/);
    if (commandName === 'kick') {
        if (args.length === 0) return message.reply('Please provide an Discord ID');
        const member = message.guild.members.cache.get(args[0]);
        if (member) {
            member.kick().then((member) => message.channel.send(member + "was kicked."));
        } else {
            message.reply('That member was not found');
        }
    }
    else if (commandName === 'hello') {
        message.reply("Hello, I'm a secretary bot who can help you manage things in your life.");
    }
    else if (commandName === 'play'){
        if (args.length === 0) return message.reply('Please provide an Youtube link.');
        startMusic(message,args);
    } 
    else if(commandName == 'search'){
        

    }
    else {
        //If the input command isn’t valid we write an error message into the chat.
        message.channel.send("You need to enter a valid command!");
    }
})

function startMusic (message,args){
    //Coming soon...
    message.channel.send("Music started...");
}

client.login(auth.token);