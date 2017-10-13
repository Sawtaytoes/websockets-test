// Global Dir Hack
global.baseDir = `${__dirname}/`

const dir = require(`${global.baseDir}directories`)
const setupServer = require(`${dir.server}setupServer`)
const startServer = require(`${dir.server}startServer`)
const setupWebSocketServer = require(`${dir.server}setupWebSocketServer`)

const server = setupServer()

server.get(
	'/',
	(req, res) => res.end('You no be hearz.')
)

setupWebSocketServer(startServer(server))
