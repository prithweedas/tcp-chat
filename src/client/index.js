import tcp from 'net'
import rl from '../utils/readlineAsync'

import { PORT, ENCODEING, HOST } from '../config'
import { extractPort, extractHost } from '../utils/extractFromArgs'

const args = process.argv.slice(2)
const port = extractPort(args)
const host = extractHost(args)

console.log(port)

const client = tcp.createConnection({ host: host || HOST, port: port || PORT }, () =>
	console.log(`Connected to ${host || HOST}:${port || PORT}`))
rl.onLine(line => {
	client.write(line)
})

rl.addCommands({
	name: 'exit',
	description: 'Exit the chat',
	func() {
		client.end()
		process.exit()
	}
})

client.setEncoding(ENCODEING)
client.on('data', data => console.log(data))
client.on('error', err => {
	console.log(err)
	process.emitWarning(new Error('Oops! Something unexpected happend'))
})
