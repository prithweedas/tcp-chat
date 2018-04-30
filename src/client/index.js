import tcp from 'net'
import rl from '../utils/readlineAsync'

import { PORT, ENCODEING, HOST } from '../config'
import { extractPort, extractHost } from '../utils/extractFromArgs'

const args = process.argv.slice(2)
const port = extractPort(args)
const host = extractHost(args)

console.log(host, port)
const client = tcp.createConnection({ host: host || HOST, port: port || PORT }, () =>
	console.log(`Connected to ${host || HOST}:${port || PORT}`))
rl.onLine(line => {
	client.write(line)
})

client.setEncoding(ENCODEING)
client.on('data', data => console.log(data))
client.on('error', () => process.emitWarning(new Error('Oops! Something unexpected happend')))
