import tcp from 'net'

import { PORT, ENCODEING, HOST } from '../config'

const [host, port] = process.argv.slice(2)

const client = tcp.createConnection(
	{ host: host || HOST, port: port || PORT },
	() => process.stdout.write(`Connected to ${HOST}:${PORT} \n`)
)

client.setEncoding(ENCODEING)
client.on('data', data => console.log(data))
