import * as http from 'http'

const host = 'exchange-rates-mir.vercel.app'
const port = 8000

const requestListener = (req: any, res: any) => {
	res.writeHead(200)
	res.end('Hello, world!')
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`)
})
