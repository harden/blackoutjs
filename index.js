const Discord = require("discord.js"); 
const client = new Discord.Client();
var today = new Date(); // this function just receives the current time and date for some of the commands to print
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
var first = ['JAMES	', 'JOHN	', 'ROBERT	', 'MICHAEL  ', 'WILLIAM	', 'DAVID	', 'RICHARD	', 'CHARLES	', 'JOSEPH	', 'DONALD		', 'BRIAN   ', 'ANTHONY	'] [Math.floor(Math.random() * 12)];
var last = ['SMITH', 'HERNANDEZ', 'LOPEZ', 'BROWN', 'WALKER', 'CLARKE', 'JENSEN', 'SCHMIT', 'MELNIK', 'WANG', 'CHEN', 'KIM'] [Math.floor(Math.random() * 12)];
var emailnum = ['6378', '1279', '3459', '1238', '8864', '4609', '3323', '6656', '3246', '1693', '2234', '4432'] [Math.floor(Math.random() * 12)];
var emailprov = ['gmail.com', 'yahoo.com', 'aol.com', 'hotmail.cc', 'protonmail.com', 'gmail.com', 'icloud.com', 'yandex.ru', 'yahoo.com'] [Math.floor(Math.random() * 9)];
var location = ['Longitude: 2.1176 Latitude: -93.13618 ', 'Longitude: Latitude: -93.13618 ', 'Longitude: -42.266667 Latitude: -20.71825 ', 'Longitude: 45.82571 Latitude: 12.14514', 'Longitude: 60.98389 Latitude: -761.68702'] [Math.floor(Math.random() * 5)];
var ipaddress = ['188.140.234.12', '57.163.139.83', '25.137.0.129', '70.54.76.75', '119.154.5.37', '35.170.4.228', '48.142.45.225', '12.78.84.134', '50.215.246.253', '85.106.158.235', '182.6.242.218'] [Math.floor(Math.random() * 11)];




 // !!!! ATTENTION FOR BOT TO WORK PUT TOKEN in "./config.json"
const config = require("./config.json");

client.on("ready",  () => {
 
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  console.log("bot is now online ---- started at " + dateTime)
 // client.users.cache.get('enter you discord id').send("bot is now online ---- started at  " + dateTime) makes it message the owner replace discord id with yours
  client.user.setActivity(`(-help) Serving ${client.guilds.cache.size} servers`);
});

client.on("guildCreate", guild => {
 
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

});


client.on("message", async message => {           //  makes sure that the bot only reads messages that start with the prefix  (set in config.json)
  
  if(message.author.bot) return;
  
  
  if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  
  if(command === "ping") {
    const m = await message.channel.send("Calculating....");
    m.edit(`Looking for this ms. ---- ${Math.round(client.ws.ping)}ms:white_check_mark: `);

  }
  
  if(command === "say") { // makes the bot say whatever the user says (doesnt run commands)
    if(!message.member.roles.cache.some(r=> ["Admin", "Owner"].includes(r.name)))
    message.reply("Sorry, you don't have permissions to use this!");
    else {
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
    }
  }
  
  if(command === "ban") {
    
    if(!message.member.roles.cache.some(r=>["Admin", "Owner"].includes(r.name)))      // honestly you could make a way better ban command in 5 minutes but im too lazy to ban people using a bot
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("The user mentioned if any is not a valid member of the server.");
    if(!member.bannable) 
      return message.reply("Error. Cannot ban for these possible reasons: could be higher up, lack of perms, player is already banned");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason given.";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`); // if you don't have perms to ban, the bot displays that. if you do have perms to ban it bans them and displays the message in chat.
  }

  if (command === "kick") {
    if(!message.member.roles.cache.some(r=>["Admin", "Owner", "Moderator"].includes(r.name)))
    return message.reply("Sorry, you don't have permissions for this command.")
      let member = message.mentions.members.first();
     if(!member)
      return message.reply("The user mentioned if any is not a valid member of the server.");
      if(!member.kickable)
     return message.reply("Error. Cannot kick for these possible reasons: could be higher up, lack of perms, player is no longer in the server.")
      let reason = args.slice(1).join('');
     if(!reason) reason = 'No reason given.';

     await member.kick(reason)
     .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }
   
  if(command === "purge") {
    if(!message.member.roles.cache.some(r=>["Admin", "Owner", "Moderator"].includes(r.name)))      
    return message.reply("Sorry, you don't have permissions to use this!");
        const deleteCount = parseInt(args[0], 10);
     
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("# can only be between 2 and 100");
    
 
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

    if (command === "dice") {
      var dice = ['1', '2', '3', '4', '5', '6'] [Math.floor(Math.random() * 6)];
      message.channel.send("You rolled a " + dice)
        
        } 

    
  if (command === "status") {
   message.channel.send("Bot is online. --- " + dateTime)
  }

  if (command === "source") {
    message.author.send("https://github.com/grapheetee/blackoutjs/")
    
  }


  if (command === "dm") {
    client.users.cache.get('448096214584524810').send('import message here');             // right click someone's name on discord you wish to dm (must be in developer mode) then input after
    client.users.cache.get('448096214584524810').send('import message here')              // client.users.cache.get('putdiscordidhere').send('message here')
  }

  if (command ===  "8ball") {
  var ball = ["I don't think thats a good idea.", "Go for it, give it a try.", "Absolutely not.", "Maybe you should think this over yourself.", "50/50 Honestly", 'Goodluck.'] [Math.floor(Math.random() * 6)]; 
    message.channel.send(":fortune_cookie: The 8ball concludes: " + ball)  // this command is simple, you input an idea you question, and the 8 ball gives you an answer.
                                                                              // you can add more list items to the variable, just change the Math.random number at the end to the total items you have
}
 
 if (command === "fakeperson") {
    
    const embed = new Discord.MessageEmbed()
    embed.setColor("#C16DF7")
    embed.setDescription("random information")
    embed.addField("First Name:", `${first}`)
    embed.addField("Last Name:", `${last}`)
    embed.addField("Email:", `${message.author.username}`+`${emailnum}`+"@"+`${emailprov}`)
    embed.addField("Location:", `${location}`)
    embed.addField("IP Address:", `${ipaddress}`)
    message.channel.send(embed)
  }

if(command === "help") {
  const embed = new Discord.MessageEmbed()
    embed.setColor("#C16DF7")
    embed.addField("-whois", `This command tells you info about the user that types it username,id,nickname,account date creation`)
    embed.addField("-8ball", `This command is simple, you input an idea you question, and the 8 ball gives you an answer.`)
    embed.addField("-av @tag#0001", `Enhances the tagged user's avatar for the channel to view.`)
    embed.addField("-ping", `Shows the user's ping to the Discord API.`)
    embed.addField("-dice", `Rolls a die, 1-6.`)
    embed.addField("-source", `Provides the link to the source code of this discord bot so you can make one for yourself!`)
    embed.addField("-status", `Shows if the bot is online and watching for the (-) prefix.`)
    embed.addField("-kick", `Under dev. as of 8/13/2020 (coming soon)`)
    embed.addField("-ban", `-ban user reason (drops the ban hammer obviously)`)
    embed.addField("purge", `-purge <# from 2-100> (deletes (#) many messages)`)
    embed.addField("-fakeperson", `Generates random information that has no relevance whatsoever.`)
  message.channel.send(embed);
  return;
}
  


   if (command === "whois") {
     if (message.author ==="743931293779099749") return
     message.channel.send("owner of the bot yeehaw")
    const embed = new Discord.MessageEmbed()
    embed.setAuthor(message.author.username)
    embed.setDescription("$------------------$")
    embed.setColor("#C16DF7")
    embed.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)/ 
    embed.addField("ID", message.author.id)
    embed.addField("Nickname:", `${message.nickname !== null ? `${message.nickname}` : 'None'}`, true)
    embed.addField("Created At", message.author.createdAt)
    embed.addField("You Joined the server at", message.member.joinedAt)
    message.channel.send(embed);

    return;
   }
  
    if (command === "av") {
      if(message.mentions.users.size){
        let member=message.mentions.users.first()
    if(member){
        const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
        message.channel.send(emb)
        
    }
    else{
        message.channel.send("Sorry none found with that name")

    }
    }else{
        const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username)
        message.channel.send(emb)
    }
}
    
});

client.login(config.token);
