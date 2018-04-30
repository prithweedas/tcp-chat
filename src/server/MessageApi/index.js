class MessageApi {
	constructor() {
		this.clients = []
	}
	addClient = client => {
		this.clients.push(client)
	}

	alreadyLoggedIn = client => {
		const index = this.clients.findIndex(value => value.id === client.id)
		return index !== -1
	}

	sendMessage = (msg, sender) => {
		this.clients.forEach(client => {
			if (client.id !== sender.id) client.write(`${sender.name || ''}: ${msg}`)
		})
	}
}

export default MessageApi
