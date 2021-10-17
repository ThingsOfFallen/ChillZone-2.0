const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
module.exports = async (member, client) => {
    const channel = member.guild.channels.cache.find(channel => channel.id === config.utility.welcome_channel);
    const logs = member.guild.channels.cache.find(channel => channel.id === config.logs.member_logs)
    const role = member.guild.roles.cache.find(role => role.id === config.utility.welcome_role);
    channel.send(`Welcome ${member} to ChillZone! Please read <#783554735516680212> to get started.`);
    member.roles.add(role);
    let embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Member Join')
        .setDescription(`${member} - ${member.user.tag} (${member.id})`)
        .addField(`Created At:`, `${member.user.createdAt}`)
        .setTimestamp()
        .setFooter('ChillZone Logging')
    logs.send(embed)
} 