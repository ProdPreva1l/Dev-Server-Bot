const {ModalBuilder, TextInputBuilder, ActionRowBuilder} = require("discord.js");
module.exports = {
    async execute(interaction) {
        if (interaction.customId === 'ticket_create') {
            const modal = new ModalBuilder()
                .setCustomId('ticket_Create')
                .setTitle('Create a ticket');

            const reason = new TextInputBuilder()
                .setCustomId('ticketReason')
                .setRequired(true)
                .setPlaceholder("I would like to inquire about Advanced Server Zones.")
                .setLabel("What is the reason for this ticket?")
                .setStyle(1);

            const details = new TextInputBuilder()
                .setCustomId('ticketDetails')
                .setLabel("Provide more information (Optional)")
                .setRequired(false)
                .setPlaceholder("The bug does not happen on older versions.")
                .setStyle(2);

            const one = new ActionRowBuilder().addComponents(reason);
            const two = new ActionRowBuilder().addComponents(details);

            // Add inputs to the modal
            modal.addComponents(one, two);

            await interaction.showModal(modal);
            return;
        }
        if (interaction.customId === 'ticket_close') {
            await interaction.reply({content: `Ticket Closing!`, ephemeral: true});
            await interaction.channel.delete();
        }
    }
};