import { fork } from 'child_process'

const [serverOrClient, ...otherArgs] = process.argv.slice(2)

switch (serverOrClient) {
case '--host':
	fork('./src/server', [...otherArgs])
	break

case '--connect':
	fork('./src/client', [...otherArgs])
	break

default:
	console.log(`Invalid Arguments!
Arguments must be one of the followings:
	--host <PORT || 4000>
	--connect <HOST || 127.0.0.1> <PORT || 4000>`)
	break
}
