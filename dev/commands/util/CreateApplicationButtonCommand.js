const { SlashCommandBuilder, EmbedBuilder, version, ButtonBuilder, ButtonStyle, ActionRowBuilder, Snowflake} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-application-button')
        .setDescription('Places the SMP application button'),
    async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.id === '1211915829831143464')) {
            await interaction.reply({content: "No Permission!", ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("SMP Application")
            .setDescription("Click the button below to apply to join the SMP!");

        const button = new ButtonBuilder()
            .setCustomId('application_create')
            .setLabel('Start Application!')
            .setStyle(1);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.channel.send({embeds: [embed], components: [row]});
        await interaction.reply({content: "Button placed", ephemeral: true})
    }
};