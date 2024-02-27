const { SlashCommandBuilder, EmbedBuilder, version, ButtonBuilder, ButtonStyle, ActionRowBuilder, Snowflake} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-verify-button')
        .setDescription('Places the verify button'),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.id === '1211915829831143464')) {
            await interaction.reply({content: "No Permission!", ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("Verify")
            .setDescription("Click the button below to verify!");

        const button = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify')
            .setStyle(3);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.channel.send({embeds: [embed], components: [row]});
        await interaction.reply({content: "Button placed", ephemeral: true})
    }
};