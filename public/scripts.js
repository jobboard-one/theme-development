
const startWebsocket = () => {
	if ('WebSocket' in window) {

		const ws = new WebSocket('ws://localhost:5000')

		ws.onopen = () => {
			console.log('Websocket connected')
		}

		ws.onmessage = () => {
			document.querySelector('#styles').setAttribute('href', '/styles.css?random=' + Math.random())
		}

		ws.onclose = () => { 
			setTimeout(() => {
				startWebsocket()
			}, 1000)
		}
	}
}

startWebsocket()


let navOpened = false

const toggleNav = () => {

	navOpened = !navOpened
	const navEl = document.querySelector('.main-header__nav')
		shadowEl = document.querySelector('.main-header__shadow')

	if(navOpened) {
		navEl.classList.add('main-header__nav--opened')
		shadowEl.classList.add('main-header__shadow--visible')
	} else {
		navEl.classList.remove('main-header__nav--opened')
		shadowEl.classList.remove('main-header__shadow--visible')
	}
}

document.querySelector('.main-header__nav-button').addEventListener('click', toggleNav, false)
document.querySelector('.main-header__shadow').addEventListener('click', toggleNav, false)