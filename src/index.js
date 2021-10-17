const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Client({
    messageSweepInterval: 120,
    messageCacheLifetime: 120,
    messageCacheMaxSize: 120,
    messageEditHistoryMaxSize: 120,
    fetchAllMembers: true,
    disableMentions: 'none',
    ws: { intents: Intents.ALL }
});

client.commands = new Collection();

fs.readdirSync('./src/commands/').forEach(dir => {
    const commands = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (let file of commands) {
        let pull = require(`./commands/${dir}/${file}`);
        client.commands.set(pull.name, pull);
    }
});

client.once('ready', async () => require('./events/ready') (client));
client.on('message', async (message) => require('./events/message') (client, message));
client.on('guildMemberAdd', async (member) => require('./events/guildMemberAdd') (member, client));
client.on('guildMemberRemove', async (member) => require('./events/guildMemberRemove') (member, client));

client.login(config.client.token);