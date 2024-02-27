const {PermissionsBitField, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder} = require("discord.js");
const {env} = require("../../config");
module.exports = {
    async execute(interaction) {
        const reason = interaction.fields.getTextInputValue('ticketReason');
        const details = interaction.fields.getTextInputValue('ticketDetails') !== ""
            ? interaction.fields.getTextInputValue('ticketDetails')
            : "None Provided!";

        const ticketName = interaction.member.displayName.slice(0,4) + "-ticket"
        const ticketChannel = await interaction.guild.channels.create({
            name: ticketName,
            parent: '1211933445073281034',
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: '1211915940875472916',
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
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
            .setTitle(`${interaction.member.displayName}'s Ticket`)
            .setDescription(`**${reason}**`)
            .setFields({name: 'Extra Info', value: details})

        const button = new ButtonBuilder()
            .setCustomId('ticket_close')
            .setLabel('Close')
            .setStyle(4);

        const row = new ActionRowBuilder()
            .addComponents(button);

        ticketChannel.send({embeds: [embed], components: [row], content: `<@${interaction.member.id}> | <@&1211915940875472916>`})

        await interaction.reply({content: `Ticket Created! <#${ticketChannel.id}>`, ephemeral: true})
    }
};