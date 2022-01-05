module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        // get command from `commands` collection based on the command name
        const command = interaction.client.commands.get(interaction.commandName);
    
        if(!command) return;
    
        // execute the command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
        }
    }
}