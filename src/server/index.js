import tcp from 'net'
import shortId from 'shortid'

import { PORT } from '../config'
import { extractPort } from '../utils/extractFromArgs'
import MessageApi from './MessageApi'

const messageApi = new MessageApi()

const server = tcp.createServer()

const args = process.argv.slice(2)
const port = extractPort(args)

server.on('connection', socket => {
	const id = shortId.generate()
	socket.id = id
	socket.write('Please Enter an username:')

	socket.on('data', data => {
		if (!messageApi.alreadyLoggedIn(socket)) {
			socket.name = data
			messageApi.sendMessage(`${data} joined the chat`, socket)
			messageApi.addClient(socket)
			return
		}

		messageApi.sendMessage(data, socket)
	})
	socket.on('end', () => process.send('\nConnection End'))
	socket.on('error', () => process.emitWarning(new Error(`${socket.name} disconnected`)))
})

server.on('error', () => process.emitWarning(new Error('Something went wrong!')))

server.listen(port || PORT, () =>
	process.stdout.write(`Server started on port ${port || PORT}\n`))
