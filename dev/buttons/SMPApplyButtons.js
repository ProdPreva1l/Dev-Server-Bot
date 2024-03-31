const {ModalBuilder, TextInputBuilder, ActionRowBuilder} = require("discord.js");
module.exports = {
    async execute(interaction) {
        if (interaction.customId === 'application_create') {
            const modal = new ModalBuilder()
                .setCustomId('application_create_modal')
                .setTitle('Apply to join the SMP');

            const username = new TextInputBuilder()
                .setCustomId('application_username')
                .setRequired(true)
                .setPlaceholder("Ex: Preva1l")
                .setLabel("What is your Minecraft username?")
                .setStyle(1);

            const reason = new TextInputBuilder()
                .setCustomId('application_reason')
                .setLabel("Who are you and why should you join?")
                .setRequired(true)
                .setPlaceholder("Ex: I am an outgoing person ready to have fun! I should join because I feel I match the vibe!")
                .setStyle(2);

            const agree_to_terms = new TextInputBuilder()
                .setCustomId('application_terms')
                .setLabel("Do you accept the rules?")
                .setRequired(true)
                .setPlaceholder("Ex: I acknowledge and pledge to not break any rules.")
                .setStyle(1);


            const one = new ActionRowBuilder().addComponents(username);
            const two = new ActionRowBuilder().addComponents(reason);
            const three = new ActionRowBuilder().addComponents(agree_to_terms)

            modal.addComponents(one, two, three);

            await interaction.showModal(modal);
            return;
        }
        if (interaction.customId === 'application_deny') {
            if (!interaction.member.roles.cache.some(role => role.id === '1211915829831143464')) {
                await interaction.reply({content: "No Permission!", ephemeral: true})
                return;
            }
            await interaction.reply({content: `Denying!`, ephemeral: true});
            await interaction.channel.delete();
        }
        if (interaction.customId === 'application_accept') {
            if (!interaction.member.roles.cache.some(role => role.id === '1211915829831143464')) {
                await interaction.reply({content: "No Permission!", ephemeral: true})
                return;
            }
            await interaction.reply({content: `Your application has been accepted and you have been added to the whitelist!`});
        }
    }
};