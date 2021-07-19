const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json")
exports.run = async(client, message, args) => {
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
//EMİRHAN SARAÇ
const { attention, igne, no2, yes2, user, mention, stats } = require('../../emoji.json')
  const users = message.mentions.users.first() || message.author;
  if (!users)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("0x36393E")
        .setTitle(`${no2} Hata`)
        .setDescription(`${mention} Lütfen birisini etiketle!`)
    );

  let erkek = db.get(`erkekpuan_${message.guild.id}_${users.id}`);
  let kız = db.get(`kadınpuan_${message.guild.id}_${users.id}`);

  message.channel.send(`${users} Adlı Kullanıcı Bu Sunucuda: \n\n${stats} **Toplam \`  ${kız || "0"}  \` Kadın Kaydetmiş!** \n${stats} **Toplam \`  ${erkek || "0"}  \`  Erkek Kaydetmiş!** `);
};//EMİRHAN SARAÇ

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ['kayıtistatistik']
};

exports.help = {
  name: "kayıt-istatistik",
description: "Yetkililer hakkında bilgi verir.",
type: "Yapılandırma"
};
//EMİRHAN SARAÇ
