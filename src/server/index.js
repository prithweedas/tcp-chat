import tcp from 'net'
import { PORT } from '../config'
import { extractPort } from '../utils/extractFromArgs'

const server = tcp.createServer()

const args = process.argv.slice(2)
const port = extractPort(args)

server.on('connection', socket => {
	socket.write('Welcome')
	// socket.setEncoding(ENCODEING)
	socket.on('end', () => process.send('\nConnection End'))
	socket.on('error', () => process.emitWarning(new Error('Connection Error')))
	socket.on('data', data => console.log(data))
})

server.on('error', () =>
	process.emitWarning(new Error('Something went wrong!')))

server.listen(port || PORT, () =>
	process.stdout.write(`Server started on port ${port || PORT}\n`))
