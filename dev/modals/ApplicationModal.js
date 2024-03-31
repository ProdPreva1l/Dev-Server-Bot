const {PermissionsBitField, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder} = require("discord.js");
module.exports = {
    async execute(interaction) {
        const username = interaction.fields.getTextInputValue('application_username');
        const reason = interaction.fields.getTextInputValue('application_reason');
        const terms = interaction.fields.getTextInputValue('application_terms');

        const ticketName = interaction.member.displayName.slice(0,4) + "-smp-application"
        const ticketChannel = await interaction.guild.channels.create({
            name: ticketName,
            parent: '1223906185699131442',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                }
            ],
        })

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.member.displayName}'s SMP Application`)
            .setDescription(`**Minecraft Username:** ${username}\n**Terms:** ${terms}`)
            .setFields({name: 'Why do you want to join?', value: reason})

        const button = new ButtonBuilder()
            .setCustomId('application_deny')
            .setLabel('Deny')
            .setStyle(4);

        const button2 = new ButtonBuilder()
            .setCustomId('application_accept')
            .setLabel('Accept')
            .setStyle(3);

        const row = new ActionRowBuilder()
            .addComponents(button).addComponents(button2);

        ticketChannel.send({embeds: [embed], components: [row], content: `<@${interaction.member.id}> | <@&1211915940875472916>`})

        await interaction.reply({content: `Ticket Created! <#${ticketChannel.id}>`, ephemeral: true})
    }
};