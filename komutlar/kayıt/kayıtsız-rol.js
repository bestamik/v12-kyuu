const emirhan = require('discord.js')
const sarac = require('quick.db');
const ayarlar = require('../../ayarlar.json')
//EMİRHAN SARAÇ
const { attention, igne, no2, yes2, user, mention } = require('../../emoji.json')
exports.run = async (client, message, args) => {
      let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${attention} Bu komutu kullanabilmek için \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`)  

   let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol) {
    const hata = new emirhan.MessageEmbed()
    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`${igne} Rol belirtmeniz gerekiyor! \n\n**Örnek Kullanım:** \n\`\`\`${prefix}kayıt-kayıtsız-role @roletiket\`\`\``) 
    .setColor('0x36393E')
    .setTimestamp()
    return message.channel.send(hata)
      }//EMİRHAN SARAÇ

  else newRole = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name  
    sarac.set(`kayıtisim.${message.guild.id}`, isim)
  let otorol = await sarac.set(`isimkayıtsızRol.${message.guild.id}`, newRole)
  if (!message.guild.roles.cache.get(newRole)){
    const hata = new emirhan.MessageEmbed()
    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`${no2} Etiketlediğiniz rol bulunamadı, etiketlediğiniz rolün etiketlenebilirliğinin aktif olduğundan emin olunuz`) 
    .setColor('0x36393E')
    .setTimestamp()
    return message.channel.send(hata)
      } //EMİRHAN SARAÇ

const embed = new emirhan.MessageEmbed()
.setAuthor(`Başarılı!`, message.author.avatarURL())
.setDescription(`${yes2} İsim kayıt sisteminde kullanılacak olan **kayıtsız** rolü: <@&${newRole}> olarak seçildi!`)
.setTimestamp()
.setColor("0x36393E")

 return message.channel.send(embed)
//EMİRHAN SARAÇ

};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıt-kayıtsız-rol'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-kayıtsız-role',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'teyit-kayıtsız-rol'
}
