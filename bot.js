// dotenv
require('dotenv').config()

// twitch modules
const { Client } = require('tmi.js')
const api = require('twitch-api-v5')

const { format } = require('timeago.js')

// variable de conexion
const client = new Client({
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

// clientID api
api.clientID = process.env.CLIENT_ID

// conexion
client
  .connect()
  .then(() => client.say('twitch', 'Hello everyone.'))
  .catch((err) => console.error(err))

// aviso de solo seguidores
client.on('followersonly', (channel, enabled, minutes) => {
  if (enabled) {
    console.log('Followers-only mode was enabled without throwing an error.')
  }
})

client.on('connected', (address, port) => {
  client.action(
    process.env.TWITCH_CHANNEL_0,
    `the bot has connected ${address}:${port}`,
  )
})

//subcription
client.on('subscription', function (channel, username, methods) {
  client.say(channel, `${username} Has subscribed PogChamp `)
})

client.on('resub', function (
  channel,
  username,
  months,
  message,
  userstate,
  methods,
) {
  client.say(
    channel,
    `${username} Has subscribed for ${months} months in a row PogChamp `,
  )
})

// saludos
client.on('chat', async (channel, tags, message, self) => {
  // ignore and use own stream commands
  if (self) return

  const commandName = message.trim()

  if (commandName === '!hello') {
    client.say(channel, `@${tags.username}, bienvenido a el stream`)
  }

  //test comand
  if (commandName === '!ping') {
    client.say(channel, `!pong, @${tags.username}`)
  }

  /* help commands */
  if (commandName === '!cmd') {
    // help comands
    client.say(
      channel,
      `
      lista de comandos sin comillas: "!ping !hello !cote !animeradio !songlist !area51 !ilonqueen !marcianito 
      !drcote !uptime !donacion
      "`,
    )
  }

  // comandos
  if (commandName === '!uptime') {
    //uptime
    api.streams.channel(
      { channelID: process.env.TWITCH_CHANNEL_ID, stream_type: 'live' },
      (err, res) => {
        if (err) {
          client.say(channel, 'lo sentimos la streamer no esta disponible')
        } else {
          const timeStream = new Date(res.stream.created_at)
          client.say(channel, `streaming ${format(res.stream.created_at)}`)
        }
      },
    )
  }

  if (commandName === '!cote') {
    // cotepond url
    client.say(
      channel,
      'redes sociales: instagram, facebook, twitter : cotepond patreon: patreon.com/cotepond twitch: cotepondd  url: cotepond.blog',
    )
  }

  if (commandName === '!intermachine') {
    // comunidad de codigo
    client.say(
      channel,
      'codigo de bot liberado: github.com/intermachine-developers/twitch-chat-bot y comunidad de codigo que promociona el bot: github.com/intermachine-developers',
    )
  }

  if (commandName === '!animeradio') {
    // emisora anime
    client.say(
      channel,
      'emisora de anime http://stream.tsubakianimeradio.com:9000',
    )
  }

  if (commandName === '!songlist') {
    // songlist youtube
    client.say(
      channel,
      'playlist anime: https://www.youtube.com/playlist?list=PLYtz7wWLjIVjmUYkrvaxMqnHjsHgpP7Fx',
    )
  }

  if (commandName === '!ilonqueen') {
    // youtube de ilonqueen song
    client.say(
      channel,
      'cancion la ilonqueen: https://www.youtube.com/watch?v=L2mT3YBjbJ0',
    )
  }

  if (commandName === '!area51') {
    // aliens
    client.say(channel, 'los aliens te obligan a ver fire in the sky')
  }

  if (commandName === '!marcianito') {
    // la cumbia de marcianito
    client.say(
      channel,
      'la cumbia de marcianito 100% real no fake: https://www.youtube.com/watch?v=Du1UJyRwmts',
    )
  }

  if (commandName === '!drcote') {
    client.say(
      channel,
      'canal de youtube de caso cerrado: https://www.youtube.com/channel/UCGbofRROopWrumVob5w61OA',
    )
  }

  if (commandName === '!anime') {
    // animes
    client.say(channel, 'anime y mas en https://animeflv.net')
  }

  if (commandName === '!donacion') {
    client.say(
      channel,
      'donaciones de twitch en: https://streamlabs.com/cotepondd/tip',
    )
  }
})
