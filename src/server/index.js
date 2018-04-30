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
			messageApi.addClient(socket)
			messageApi.sendMessage(`${socket.name} joined the chat`)
			socket.write(`Welcome ${socket.name}, you can start chatting now`)
			return
		}

		messageApi.sendMessage(data, socket)
	})
	socket.on('end', () => process.send(new Error(`${socket.name || socket.id} disconnected`)))
	socket.on('error', () =>
		process.emitWarning(new Error(`${socket.name || socket.id} disconnected`)))
})

server.on('error', () => process.emitWarning(new Error('Something went wrong!')))

server.listen(port || PORT, () =>
	process.stdout.write(`Server started on port ${port || PORT}\n`))
