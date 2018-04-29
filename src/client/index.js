import tcp from 'net'

import { PORT, ENCODEING } from '../config'

const [host, port] = process.argv.slice(2)

const client = tcp.createConnection(
	{ host: host || '127.0.0.1', port: port || PORT },
	() => process.stdout.write('Connected\n')
)

client.setEncoding(ENCODEING)
client.on('data', data => console.log(data))
