const fs = require('fs')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)
const logger = require(`${dir.utils}logger`)

const createServer = serverSettings => {
	const http = require('http')

	return http.createServer(serverSettings)
}

const createSecureServer = serverSettings => {
	const https = require('https')
	const enforce = require('express-sslify')

	const certs = {
		cert: fs.readFileSync('./conf/domain-crt.txt'),
		key: fs.readFileSync('./conf/key.pem'),
	}

	serverSettings
	.use(enforce.HTTPS({ trustProtoHeader: true }))

	return (
		https
		.createServer(certs, serverSettings)
	)
}

module.exports = server => (
	(
		config.isSecure()
		? createSecureServer(server)
		: createServer(server)
	)
	.listen(config.getPort(), err => {
		err
		? logger.logError(err)
		: (
			logger.log(
				'Web Server running as',
				config.getServerUrl()
			)
		)
	})
)
