const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {
        await interaction.reply(`User Info:\nName: ${interaction.user.username}\nTag: ${interaction.user.tag}\nID: ${interaction.user.id}`);
    }
}