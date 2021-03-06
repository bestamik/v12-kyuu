const Discord = require('discord.js');
const db = require('quick.db')
const ms = require("ms");
//EMİRHAN SARAÇ

const { attention, igne, no, yes, user, mention } = require('../../emoji.json')
exports.run = async(client, message, args) => {
              const ayarlar = require('../../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
//EMİRHAN SARAÇ
//EMİRHAN SARAÇ

  let mutel = await db.fetch(`isimerkekRol.${message.guild.id}`);
  let yetkili = await db.fetch(`isimyetkiliRol.${message.guild.id}`);
  let kayitsiz = await db.fetch(`isimkayıtsızRol.${message.guild.id}`);
  let logkanal = await db.fetch(`kayıtlog_${message.guild.id}`)
     let kayıtkanal = await db.fetch(`kayıtkanal_${message.guild.id}`)

//EMİRHAN SARAÇ

  if (!yetkili) return
  if (!mutel) return
  if(!message.member.roles.cache.has(yetkili)) {
    const hata = new Discord.MessageEmbed()
    .setAuthor('HATA', message.author.avatarURL())
    .setDescription(`${attention} Bu komut için yetersiz izniniz bulunuyor! Yetkili rolüne sahip olmalısınız!`) 
    .setColor('0x36393E')
    .setTimestamp()
    return message.channel.send(hata)
      }
//EMİRHAN SARAÇ
      if (message.channel.id != kayıtkanal) return message.reply(`${attention} Lütfen Kayıtı <#${kayıtkanal}> Kanalında Yapınız`)


    let kisi = message.mentions.members.first()
    if (!kisi) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${igne} Lütfen bir kullanıcıyı etiketleyin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        }
//EMİRHAN SARAÇ

    let isim = args[1];
    if(!isim){
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${igne} Bir isim girmelisin. Kullanıcın iki ismi varsa lütfen bir tanesini giriniz!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        }
    if(isim.length > 12) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${no} Lütfen doğru bir isim giriniz! Girdiğiniz isim çok uzun!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        }
    let yaş = args[2];
    if(!yaş){
      //EMİRHAN SARAÇ

      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${igne} Bir yaş girmelisin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        
  }
    if(yaş.length > 2) {
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${no} Lütfen doğru bir yaş giriniz! Girdiğiniz yaş çok büyük!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}e @kullanıcı İsim Yaş\`\`\` `) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        }
    //EMİRHAN SARAÇ

    if (kisi.id === message.author.id) { 
      const hata = new Discord.MessageEmbed()
      .setAuthor('HATA', message.author.avatarURL())
      .setDescription(`${no} Kendinizi kayıt edemezsiniz!`) 
      .setColor('0x36393E')
      .setTimestamp()
      return message.channel.send(hata)
        }

    let toplam = await db.fetch(`toplamkayıt.${message.guild.id}_${kisi.id}`);
//EMİRHAN SARAÇ
 const kayıtlogkanal = message.guild.channels.cache.find(kanal => kanal.id === logkanal);    
if (!kayıtlogkanal) return;
        const embed22 = new Discord.MessageEmbed()
        .setTitle(`${yes} Mükemmel!`)
  .setDescription(`${user} **${kisi} Kullanıcısına <@&${mutel}> Rolü Verildi!**
  \`\`\`${isim} ${yaş} Olarak Kayıt Edildin!\`\`\`
  `)
    .setFooter(`${mention} Komutu kullanan yetkili : ${message.author.username} - Dragon Bot`)  
  .setThumbnail(client.user.avatarURL())
 kayıtlogkanal.send(embed22)
  message.guild.members.cache.get(kisi.id).setNickname(`${isim} | ${yaş}`)
    kisi.roles.add(mutel).then(y => y.roles.remove(kayitsiz))

  db.add(`erkekpuan_${message.guild.id}_${message.author.id}`, 1);
//EMİRHAN SARAÇ

};
//EMİRHAN SARAÇ

//EMİRHAN SARAÇ

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e', 'erkek'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-erkek',
  description: 'Erkek rolü verirsiniz.',
  usage: 'erkek',
};