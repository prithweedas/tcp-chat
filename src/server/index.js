import tcp from 'net'
import { PORT } from '../config'

const server = tcp.createServer()
let id = 0

server.on('connection', socket => {
	socket.write('Welcome')
	const myId = id++
	let counter = 0
	setInterval(() => socket.write(`${myId}-${counter++}`), 2000)
})

server.listen(PORT, () =>
	process.stdout.write(`Server started on port ${PORT}`))
