const config = require('../config.json');
module.exports = async (client, message) => {
    if (message.author.bot) return; 
    if (!message.content.startsWith(config.client.prefix) || !message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    const command = client.commands.get(cmd);
    if (command) {
        if (command.timeout) {
            if (timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`You can only use that command every ${ms(command.timeout)}!`);
            } else {
                timeout.add(`${message.author.id}`);
                setTimeout(() => {
                    timeout.delete(`${message.author.delete}${command.name}`)
                }, message.timeout)
            }
        }
        command.run(client, message, args);
    }
}