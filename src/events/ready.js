const config = require('../config.json');
module.exports = async (client) => {
    console.log('Ready');
    client.user.setPresence({
        activity: {
            name: 'over ChillZone!',
            type: 'WATCHING'
        },
        status: 'online'
    });
    setInterval(() => {
        const guild = client.guilds.cache.get('782547106812002326');
        const vchannel = client.channels.cache.find(channel => channel.id === '787318098583093288');
        vchannel.setName(`🌎| Members: ${guild.memberCount}`);
    }, 60000);
}