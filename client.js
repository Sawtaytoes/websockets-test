appVersion = 1

getJson = ([{ data }]) => data ? JSON.parse(data) : {}

hasNewerVersion = ({ version }) => version > appVersion

presentReloadMessage = showMessage => (
	showMessage
	&& (
		document.write(`
			<html>
				<body style="color: white; background: red">
					You version is out-of-date. <button onclick="window.location.reload()">Reload</button>
				</body>
			</html>
		`)
	)
)

checkVersion = message => (
	Promise.resolve(message)
	.then(getJson)
	.then((t) => console.debug(t) || t)
	.then(hasNewerVersion)
	.then(presentReloadMessage)
)

createWebSocketConnection = () => {
	webSocket = new WebSocket('ws://localhost:3000')

	webSocket.onclose = (...args) => (
		[
			console.log.bind(console, 'CLOSE'),
			createWebSocketConnection
		]
		.forEach(func => func(args))
	)

	webSocket.onerror = console.error.bind(console, 'ERROR')

	webSocket.onmessage = (...args) => (
		[
			console.log.bind(console, 'MESSAGE'),
			checkVersion
		]
		.forEach(func => func(args))
	)

	webSocket.onopen = console.log.bind(console, 'OPEN')
}

createWebSocketConnection()
