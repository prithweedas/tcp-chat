export const extractPort = args => {
	const index = args.findIndex(arg => arg === '--port')
	return index === -1 ? null : args[index + 1]
}
export const extractHost = args => {
	const index = args.findIndex(arg => arg === '--host')
	return index === -1 ? null : args[index + 1]
}
