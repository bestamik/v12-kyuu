const emirhan = require('discord.js');
const sarac = require('quick.db')
const { attention, igne, no2, yes2, user, mention } = require('../../emoji.json')

exports.run = async(client, message, args) => {
          const ayarlar = require('../../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
            if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${attention} Bu komutu kullanabilmek için \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`)  

  const rol = message.mentions.roles.first()
  
  if (!rol)  {
    const hata = new emirhan.MessageEmbed()
    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`${igne} Rol belirtmeniz gerekiyor! \n\n**Örnek Kullanım:** \n\`\`\`${prefix}kayıt-erkek-rol @roletiket\`\`\``) 
    .setColor('0x36393E')
    .setTimestamp()
    return message.channel.send(hata)
      
  }//EMİRHAN SARAÇ

  sarac.set(`isimerkekRol.${message.guild.id}`, rol.id)
  const embed = new emirhan.MessageEmbed()
  .setAuthor(`Başarılı!`, message.author.avatarURL())
  .setDescription(`${yes2} İsim kayıt sisteminde kullanılacak olan **Erkek** rolü: <@&${rol.id}> olarak seçildi!`)
  .setTimestamp()
  .setColor("0x36393E")
  //EMİRHAN SARAÇ

   return message.channel.send(embed)
//EMİRHAN SARAÇ

};
//EMİRHAN SARAÇ

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt-erkek-rol'],
  permLevel: 0
};//EMİRHAN SARAÇ


exports.help = {
  name: 'kayıt-erkek-role',
  description: 'Kişi susturulunca verilecek rolü ayarlarsınız.',
  usage: 'mute-rol',
};//EMİRHAN SARAÇ
