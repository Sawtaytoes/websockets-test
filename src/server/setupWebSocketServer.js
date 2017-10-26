const url = require('url')
const WebSocket = require('ws')

const dir = require(`${global.baseDir}directories`)
const logger = require(`${dir.utils}logger`)

const logClientConnected = (webSocketConnection, req) => {
	const location = url.parse(req.url)
	logger.log('[Client Connected]', location.path)
}

const logClientMessage = webSocketConnection => {
	webSocketConnection
	.on(
		'message',
		message => logger.log('[Client Message Received] %s', message)
	)
}

const sendKevinExcitements = webSocketConnection => {
	let count = 0

	setInterval(
		() => webSocketConnection.send('number of kevin excitements ' + count++),
		1000
	)
}

let version = 1

setTimeout(() => version = 2, 5000)

const messageAppVersion = webSocketConnection => {
	webSocketConnection
	.send(JSON.stringify({ version }))
}

module.exports = server => (
	new WebSocket.Server({ server })
	.on('connection', logClientConnected)
	.on('connection', logClientMessage)
	// .on('connection', sendKevinExcitements)
	.on('connection', messageAppVersion)
)
