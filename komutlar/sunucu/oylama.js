const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
   
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:blurplecross:857907152760078387>   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);
   let question = args.join(' ');
   let user = message.author.username
     const embedd = new Discord.MessageEmbed()
     .addField(`Yazı Yazman Gerek`);
   if (!question) return message.channel.send(embedd).then(m => m.delete(5000)); 
       const embed = new Discord.MessageEmbed()
       .setColor("#ffffff")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()
       .setFooter('Dragon', client.user.avatarURL)
       .addField(`**Dragon Bot  | Oylama**`, `<:blurplezil:857907151174238208> **${question}**`);
     message.channel.send(embed).then(function(message) {
         message.react('✅');
         message.react('❎');
       });

     };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["voting"],
  permLevel: 0
}

exports.help = {
  name: 'oylama'
};