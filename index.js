const fs = require('fs')
const http = require('http')
const sass = require('node-sass')
const cssnano = require('cssnano')
const nodeStatic = require('node-static')
const fileServer = new nodeStatic.Server('./public')
const wsServer = require('ws').Server

let clients = []

const server = http.createServer((req, res) => {
	fileServer.serve(req, res)
}).listen(5000)

console.log('Jobboard.One Server is running on http://localhost:5000')



const wss = new wsServer({
  server
})

wss.on('connection', ws => {
	clients.push(ws)

    ws.on('close', function() {
    
    })
})



const renderCSS = () => {
	try {
		const result = sass.renderSync({
			file: 'src/styles/styles.scss'
		})

		cssnano.process(result.css, {}).then(minified => {
			fs.writeFileSync('public/styles.css', minified.css)
			console.log('CSS build correctly')

			clients.forEach(client => {
				try {
					client.send('css')
				} catch(err) {
					console.log(err)
				}
			})
	        
		})
	} catch(err) {
		console.log(err)
	}
}

fs.watch('src/styles', {
	encoding: 'utf8',
	recursive: true
}, (eventType, fileName) => renderCSS());

renderCSS()