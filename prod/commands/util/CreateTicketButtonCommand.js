const { SlashCommandBuilder, EmbedBuilder, version, ButtonBuilder, ButtonStyle, ActionRowBuilder, Snowflake} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket-button')
        .setDescription('Places the ticket button'),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.id === '1211915829831143464')) {
            await interaction.reply({content: "No Permission!", ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("Support Ticket")
            .setDescription("Click the button below to create a support ticket!");

        const button = new ButtonBuilder()
            .setCustomId('ticket_create')
            .setLabel('General Support')
            .setStyle(1);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.channel.send({embeds: [embed], components: [row]});
        await interaction.reply({content: "Button placed", ephemeral: true})
    }
};