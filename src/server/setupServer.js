const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const dir = require(`${global.baseDir}directories`)
const config = require(`${dir.configs}`)

const corsSettings = {
	optionsSuccessStatus: 200,
	origin: config.getSafeUrl(config.getServerUrl),
}

const server = express()

server
.use(compression())
.use(helmet())
.use(cors(corsSettings))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))

.disable('x-powered-by')

module.exports = () => server
