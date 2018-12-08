const readline = require('readline')
const stdin = process.stdin
const { tty, showCursor } = require('./utils')

module.exports = (qov) => {
  // readline.emitKeypressEvents(stdin)
  // stdin.setRawMode && stdin.setRawMode(true)
  let isGoto = false
  const rl = readline.createInterface({
    input: stdin,
    output: tty
  })

  rl.on('line', name => {
    if (isGoto) return

    const total = qov.slides.length
    let index = qov.index

    const tip = `[!] Enter index(current: ${index + 1}, total: ${total}): `

    switch (name) {
      case 'q':
        showCursor()
        process.exit()
        break

      case 'l':
        index++
        if (index < qov.slides.length) {
          qov.render(index)
        }
        break

      case 'k':
        index--
        if (index >= 0) {
          qov.render(index)
        }
        break

      case 'h':
        qov.render(0)
        break

      case 'j':
        qov.render(total - 1)
        break

      case 'g':
        isGoto = true
        showCursor()

        // readline.cursorTo(tty, 0, tty.rows)
        // readline.clearLine(tty, 0)

        // tty.write(tip)

        rl.question(tip, answer => {
          isGoto = false
          // console.log(answer)
          if (/\d*/.test(answer) && answer > 0 && answer <= total) {
            qov.render(answer - 1)
            // rl.close()
          }
        })
        break

      case 'default':
        break
    }
  })

  // stdin.on('keypress', (str, key) => {
  //   if (isGoto) return

  //   const name = key.name
  //   const total = qov.slides.length
  //   let index = qov.index
  //   const tip = `[!] Enter index(current: ${index + 1}, total: ${total}): `

  //   switch (name) {
  //     case 'q':
  //       showCursor()
  //       process.exit()
  //       break

  //     case 'l':
  //       index ++
  //       if (index < qov.slides.length) {
  //         qov.render(index)
  //       }
  //       break

  //     case 'k':
  //       index --
  //       if (index >= 0) {
  //         qov.render(index)
  //       }
  //       break

  //     case 'h':
  //       qov.render(0)
  //       break

  //     case 'j':
  //       qov.render(total - 1)
  //       break

  //     case 'g':
  //       isGoto = true
  //       showCursor()

  //       // readline.cursorTo(tty, 0, tty.rows)
  //       // readline.clearLine(tty, 0)

  //       // tty.write(tip)

  //       rl.question(tip, answer => {
  //         isGoto = false
  //         // console.log(answer)
  //         if (/\d*/.test(answer) && answer > 0 && answer <= total) {
  //           qov.render(answer - 1)
  //           // rl.close()
  //         }
  //       })
  //       break

  //     case 'default':
  //       break
  //   }
  // })
}
