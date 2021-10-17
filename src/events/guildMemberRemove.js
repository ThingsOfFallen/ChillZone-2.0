const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
module.exports = async (member, client) => {
    const logs = member.guild.channels.cache.find(channel => channel.id === config.logs.member_logs)
    let embed = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Member Leave')
        .setDescription(`${member.user.tag} (${member.id})`)
        .addField(`Created At:`, `${member.user.createdAt}`)
        .addField(`Joined At:`, `${member.joinedAt}`)
        .setTimestamp()
        .setFooter('ChillZone Logging')
    logs.send(embed)
}