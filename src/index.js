import { fork } from 'child_process'

const [serverOrClient, ...otherArgs] = process.argv.slice(2)

switch (serverOrClient) {
case '--server':
	fork('./src/server', [...otherArgs])
	break

case '--client':
	fork('./src/client', [...otherArgs])
	break
default:
	console.log(`Invalid Arguments!
Arguments must be one of the followings:
	--server <PORT>
	--client <HOST> <PORT>`)
	break
}
