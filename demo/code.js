const Qov = require('../index')
const highlight = require('./highlight')
const theme = require('./theme')

const qov = new Qov({
  step: 1500
})

qov.section`${highlight(theme)`
let data = "hello"

// test
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(\`\${data}\`)
  }, 100)
}

function add(x, y) {
  return x + y;
}
`}`

qov.render()
