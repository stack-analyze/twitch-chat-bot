// dotenv module
require('dotenv').config()

// twitch module
const tmi = require('tmi.js')

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_USER,
    password: process.env.TWITCH_PASS,
  },
  channels: [process.env.TWITCH_CHANNEL],
})

client
  .connect()
  .then(() => client.say('twitch', 'Hello world.'))
  .catch(console.error)

client.on('connected', (address, port) => {
  client.action(
    process.env.TWITCH_CHANNEL_0,
    `the bot has connected ${address}:${port}`,
  )
})

client.on('chat', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return

  if (
    message.toLowerCase() === '!hello' ||
    message.toLowerCase() === 'holi' ||
    message.toLowerCase() === 'hola' ||
    message.toLowerCase() === 'holis'
  ) {
    // "@alca, heya!"
    client.say(channel, `@${tags.username}, heya!`)
  }
  if (message.toLowerCase() === '!ping') {
    // "@alca, heya!"
    client.say(channel, `!pong, @${tags.username}`)
  }
})
