const { Client, Partials, Collection } = require("discord.js")
const ms = require("ms")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")
require("dotenv").config()
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials

const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: { parse: ["everyone", "users", "roles"] },
    rest: { timeout: ms("1m") }
})


client.colorO = "#5e5bf7"; client.colorR = "#0b8519";
client.colorW = "#b41c1d"; client.colorE = "#f76d4b";


client.commands = new Collection(); 
client.slashData = new Collection();


const Handlers = ["Events", "Errors", "Commands"]
Handlers.forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})

module.exports = client
client.login(process.env.DISCORD_TOKEN)
