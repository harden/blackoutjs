const Discord = require("discord.js");
const client = new Discord.Client();

 
 
function customPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}
var today = new Date(); // this function just receives the current time and date for some of the commands to print
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// juan is an actual retard




const config = require("./config.json");

client.on("ready",  () => {
 
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  console.log("bot is now online ---- started at " + dateTime)
 // client.users.cache.get('217133751036018698').send("bot is now online ---- started at  " + dateTime) makes it message the owner replace discord id with yours
  client.user.setActivity(`blackout modworks`);
});

client.on("guildCreate", guild => {
 
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  
  if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  
  if(command === "ping") {
    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("Sorry, you don't have permissions to use this!");
    const m = await message.channel.send("Calculating....");
    m.edit(`Looking for this ms. ---- ${Math.round(client.ws.ping)}ms:white_check_mark: `);

  }
  
  if(command === "say") {
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "ban") {
    
    if(!message.member.roles.cache.some(r=>["Admin", "Owner"].includes(r.name)))
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
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if (command === "kick") {
    if (!message.member.roles.find("Admin"))
        return;
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();
    // Kick
    member.kick().then((member) => {
        // Successmessage
        message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
    }).catch(() => {
        // Failmessage
        message.channel.send("Access Denied");
    });
}

  if (command === "warn") {
    if(!message.member.roles.cache.some(r=>["Admin", "Moderator"].includes(r.name))) return
    
  }
   
  if(command === "purge") {
    
        const deleteCount = parseInt(args[0], 10);
     
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("# can only be between 2 and 100");
    
 
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "zilla") {
    message.author.send("https://drive.google.com/open?id=1vBReR0KZLJQLMxzkaRXU6-YdAsiFJHoJ")
    message.author.send("Sorry for any inconvenience!")

  }

    if(command === "messyhair") {
      message.author.send("https://cdn.discordapp.com/attachments/497557900315590656/508014757979357207/hair_006_u.ydd")
    }

    if(command === "waistbag") {
      message.author.send("https://cdn.discordapp.com/attachments/495300535717593099/649636303087992842/task_005_u.ydd")
    }

    

    if (command === "dice") {
      var dice = ['1', '2', '3', '4', '5', '6'] [Math.floor(Math.random() * 6)];
      message.channel.send("You rolled a " + dice)
        
        } 
var ip = ['85.118.127.255', '	85.117.63.255', '217.72.4.4', '100.30.98.191', '33.48.204.179', '85.87.113.130'] [Math.floor(Math.random() * 6)];   // this does like actually nothing at all lol picks random ip from list

    
  if (command === "status") {
   message.channel.send("in the works...")
  }

  if (command === "gamecords") {
    message.author.send("Valorant - https://discord.gg/valorant Rising Storm 2 - https://discord.gg/rs2vietnam SkaterXL Modding - https://discord.gg/EMhvped")
    if(message.author.id === client.user.id) return;
    console.log("invites have been dispactched to")
      console.log(message.author.id)
      console.log(dateTime)
      console.log(message.member)
  }

  if (command === "home") {
    message.author.send("https://blackout.pw/discord")
  }


  if (command === "swaggersex") {
    client.users.cache.get('448096214584524810').send('https://cdn.discordapp.com/attachments/318067268032659466/742972018374213702/vDA149F0-8DA2-4B61-96C9-E891C2B50F3D.mp4');
    client.users.cache.get('448096214584524810').send('THIS IS THE INTERNET POLISE OPEN UPPPPPPPPPPPPPPPPPPPP NOWWWWWWWWWWWWWW')
  }

  if (command === "members") {
    message.channel.send(`${guild.memberCount}`);

  }

  if (command ===  "8ball") {
  var ball = ["I don't think thats a good idea.", "Go for it, give it a try.", "Absolutely not.", "Maybe you should think this over yourself.", "50/50 Honestly", 'Goodluck.'] [Math.floor(Math.random() * 6)];
    message.channel.send(":fortune_cookie: The 8ball concludes: " + ball)
}

if(command === "help") {
  const embed = new Discord.MessageEmbed()
    embed.setColor("#FF00FF")
    embed.addField("", ``)
    embed.addField("", ``)
  

  message.channel.send(embed);
  return;
}

   if (command === "whois") {
    const embed = new Discord.MessageEmbed()
    embed.setAuthor(message.author.username)
    embed.setDescription("Information about yourself")
    embed.setColor("#FF00FF")
    embed.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
    embed.addField("ID", message.author.id)
    embed.addField("Nickname:", `${message.nickname !== null ? `${message.nickname}` : 'None'}`, true)
    embed.addField("Created At", message.author.createdAt)
    embed.addField("You Joined the server at", message.member.joinedAt)
    embed.addField("IP Address: ", ip)
    embed.addField("Father's Last Name: ")

    message.channel.send(embed);

    return;
   }
     if (command === "generate") {
       message.author.send(password)
     }
        
        if (command === "doxtest") { // set const = (nameFirst.nameLast)
          var nameFirst = ['JAMES	', 'JOHN	', 'ROBERT	', 'MICHAEL  ', 'WILLIAM	', 'DAVID	', 'RICHARD	', 'CHARLES	', 'JOSEPH	', 'DONALD		', 'BRIAN   ', 'ANTHONY	'] [Math.floor(Math.random() * 12)];
          var nameLast = ['JAMES	', 'JOHN	', 'ROBERT	', 'MICHAEL  ', 'WILLIAM	', 'DAVID	', 'RICHARD	', 'CHARLES	', 'JOSEPH	', 'DONALD		', 'BRIAN   ', 'ANTHONY	'] [Math.floor(Math.random() * 12)];
          
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
