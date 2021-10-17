const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'kick',
    run: async (client, message, args) => {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permission!');
            const user = message.mentions.users.first();
            if (!user) return message.reply('No user specified!');
            const reason = message.content.split(" ").slice(2).join(' ');
            if (!reason) return message.reply('No reason specified!');
            const member = message.guild.member(user);
            if (!member) return message.reply('Invalid user!');
            if (member.hasPermission('KICK_MEMBERS')) return message.reply('Cannot kick this user!');
            const logs = message.guild.channels.cache.find(channel => channel.id === config.logs.mod_logs);
            const logsembed = new MessageEmbed()
                .setColor('YELLOW')
                .setTitle('Member Kicked')
                .setDescription(`${member} - ${user.tag} (${user.id})`)
                .addField(`Reason:`, `${reason}`)
                .addField(`Moderator:`, `${message.author.tag}`)
                .setFooter('ChillZone Logging')
                .setTimestamp()
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('You have been kicked from ChillZone!')
                .addField('Reason:', `${reason}`)
                .setFooter('ChillZone Moderation')
                .setTimestamp()
            try {
                user.send(embed).then(d => {
                    logs.send(logsembed);
                    member.kick(`${reason}`);
                    message.channel.send('Done!');
                })
            } catch (error) {
                message.reply('Something went wrong!');
            }
    }
}