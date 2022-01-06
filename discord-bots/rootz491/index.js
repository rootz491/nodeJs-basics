const { Client, Intents } = require('discord.js');
require('dotenv').config();

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

// when the client is ready, run this code
client.once('ready', () => {
    console.log('Ready!');
})

// create listener for commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('pong');
    } else if (commandName === 'server') {
        await interaction.reply(`Server Info:\n${interaction.guild.name} has ${interaction.guild.memberCount} members!`);
    } else if (commandName === 'user') {
        await interaction.reply(`User Info:\nName: ${interaction.user.username}\nTag: ${interaction.user.tag}\nID: ${interaction.user.id}`);
    }
});

// login to discord
client.login(process.env.BOT_TOKEN);
