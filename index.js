

// ===== GLOBAL VARIABLES ==========
const seedColor = document.getElementById('seed-color')
const colorMode = document.getElementById('color-mode')
const hexContainer = document.getElementById('hex-container')
const copiedAlert = document.getElementById('copied-alert')

const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')
const color5 = document.getElementById('color5')

const color1Hex = document.getElementById('color1-hex')
const color2Hex = document.getElementById('color2-hex')
const color3Hex = document.getElementById('color3-hex')
const color4Hex = document.getElementById('color4-hex')
const color5Hex = document.getElementById('color5-hex')



// ===== FUNCTIONS ==========
function removeHexSymbol(string) {
    return string.replace('#', '')
}

function displayColorScheme(data) {
    color1.style.backgroundColor = data.colors[0].hex.value
    color2.style.backgroundColor = data.colors[1].hex.value
    color3.style.backgroundColor = data.colors[2].hex.value
    color4.style.backgroundColor = data.colors[3].hex.value
    color5.style.backgroundColor = data.colors[4].hex.value

    hexContainer.innerHTML = getHexCodeHtml(data)
}

function getHexCodeHtml(data) {
    return `
        <h4 class="hex-code" id="color1-hex" data-colorhex='${data.colors[0].hex.value}'>${data.colors[0].hex.value}</h4>
        <h4 class="hex-code" id="color2-hex" data-colorhex='${data.colors[1].hex.value}'>${data.colors[1].hex.value}</h4>
        <h4 class="hex-code" id="color3-hex" data-colorhex='${data.colors[2].hex.value}'>${data.colors[2].hex.value}</h4>
        <h4 class="hex-code" id="color4-hex" data-colorhex='${data.colors[3].hex.value}'>${data.colors[3].hex.value}</h4>
        <h4 class="hex-code" id="color5-hex" data-colorhex='${data.colors[4].hex.value}'>${data.colors[4].hex.value}</h4>
    `
}



// ===== COPY HEX TO CLIPBOARD ==========
document.addEventListener('click', (e) => {
    if (e.target.dataset.colorhex) {
        const copyText = e.target.dataset.colorhex
        navigator.clipboard.writeText(copyText)

        copiedAlert.style.display = 'flex'
        copiedAlert.style.justifyContent = 'center'
        copiedAlert.style.alignItems = 'center'

        setTimeout(() => {
            copiedAlert.style.display = 'none'
          }, 2500
        )
    }
})


// ===== GENERATE COLOR FETCH ==========
document.getElementById('get-color-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const seedColorValue = removeHexSymbol(seedColor.value)

    const colorQueryString = `
        https://www.thecolorapi.com/scheme?hex=${seedColorValue}&mode=${colorMode.value}&count=5
    `

    fetch(colorQueryString) 
        .then(res => res.json())
        .then(data => {
            displayColorScheme(data)
        })
})

