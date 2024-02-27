module.exports = {
    async execute(interaction) {
        await interaction.member.roles.add('1211916208610480138')
        await interaction.reply({ content: `Verified!`, ephemeral: true})
    }
}