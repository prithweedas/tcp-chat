import tcp from 'net'
import { PORT, ENCODEING } from '../config'

const server = tcp.createServer()

const [port] = process.argv.slice(2)

server.on('connection', socket => {
	socket.write('Welcome')
	socket.setEncoding(ENCODEING)
	socket.on('data', data => console.log(data))
})

server.listen(port || PORT, () =>
	process.stdout.write(`Server started on port ${port || PORT}`))
