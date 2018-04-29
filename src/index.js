import path from 'path'
import { fork } from 'child_process'

const [serverOrClient, ...otherArgs] = process.argv.slice(2)

switch (serverOrClient) {
case '--host':
	fork(path.join(__dirname, 'server'), [...otherArgs])
	break

case '--connect':
	fork(path.join(__dirname, 'client'), [...otherArgs])
	break

default:
	console.log(`Invalid Arguments!
Arguments must be one of the followings:
	--host <PORT || 4000>
	--connect <HOST || 127.0.0.1> <PORT || 4000>`)
	break
}
