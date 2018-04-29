import path from 'path'
import { fork } from 'child_process'

const [serverOrClient, ...otherArgs] = process.argv.slice(2)

let serverProcess
let clientProcess

switch (serverOrClient) {
case '--host':
	serverProcess = fork(path.join(__dirname, 'server'), [...otherArgs])
	break

case '--connect':
	clientProcess = fork(path.join(__dirname, 'client'), [...otherArgs])
	break

default:
	console.log(`Invalid Arguments!
Arguments must be one of the followings:
	--host <PORT || 4000>
	--connect <HOST || 127.0.0.1> <PORT || 4000>`)
	break
}
if (serverProcess) {
	serverProcess.on('error', err => console.log(err))
	serverProcess.on('message', msg => console.log(msg))
}

if (clientProcess) {
	clientProcess.on('message', msg => console.log(msg))
	clientProcess.on('error', err => console.log(err))
}
