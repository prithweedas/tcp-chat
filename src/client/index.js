import tcp from 'net'
import { PORT, ENCODEING } from '../config'

const client = tcp.createConnection(PORT, () =>
	process.stdout.write('Connected\n'))

client.setEncoding(ENCODEING)
client.on('data', data => console.log(data))
