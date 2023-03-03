const cols = document.querySelectorAll('.col')

document.onkeydown = (event) => {
	event.preventDefault()
	if (event.code === 'Space') {
		setRandomColors()
	}
}

document.onclick = (event) => {
	const type = event.target.dataset.type
	if (type === 'lock') {
		const node =
			event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0]
		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'to-copy') {
		const node = event.target
		copyToClipboard(node.textContent)
	}
}

const generateRandomColor = () => {
	const hexCodes = '0123456789abcdef'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return color
}

const setRandomColors = (isInitial) => {
	let colors = isInitial ? getColorsFromHash() : []
	cols.forEach((col, idx) => {
		const isLocked = col.querySelector('button i').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const lock = col.querySelector('button i')
		const color = isInitial 
            ? colors[idx] 
                ? colors[idx]
                : generateRandomColor()
            : generateRandomColor()
		if (isLocked) {
			colors.push(text.textContent)
			return
		}
        if (!isInitial) {
            colors.push(color)
        }
		text.textContent = color
		setTextColor(text, lock, color)
		col.style.backgroundColor = color
	})
	updateColorsHash(colors)
}

const copyToClipboard = (text) => {
	return navigator.clipboard.writeText(text)
}

const setTextColor = (text, lock, color) => {
	const lum = chroma(color).luminance()
	text.style.color = lock.style.color = lum > 0.5 ? '#000' : '#fff'
}

const updateColorsHash = (colors = []) => {
	location.hash = colors.map((color) => color.substring(1)).join('-')
}

const getColorsFromHash = () => {
	if (location.hash.length > 1) {
		return location.hash
			.substring(1)
			.split('-')
			.map((color) => '#' + color)
	} else {
		return []
	}
}

setRandomColors(true)
