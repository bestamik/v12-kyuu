exports.run = async (client, message, args) => {

    const Discord = require("discord.js");
    let giveaways = []
    const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
    const giveaways2 = giveaways1.filter((g) => !g.ended)
    const giveaways3 = giveaways2.forEach((thisGiveaway)=>{
        let winners = ''
        if(thisGiveaway.winnerCount == 1){
            winners = 'kazanan'
        }else{
            winners = 'kazananlar'
        }
        giveaways.push(`\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Ödül: **${thisGiveaway.prize}** | [Çekiliş Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`)
    })
    const embed = new Discord.MessageEmbed()
    .setColor(client.config.embedColor)
    .setTitle('Mevcut Çekilişler')
    .setDescription(giveaways.join('\n') || 'Şu anda hiçbir çekiliş yok')
    message.channel.send(embed)

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekiliş-list"],
  permLevel: 0,
};

exports.help = {
  name: 'çekiliş-liste',
  description: '',
  usage: 'davet'
};