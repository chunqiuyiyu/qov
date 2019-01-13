const readline = require('readline')
const stdin = process.stdin
const { tty, showCursor, hideCursor, EOL, showNext } = require('./utils')
const { fragFlag } = require('./styles')

module.exports = (qov) => {
  readline.emitKeypressEvents(stdin)
  stdin.setRawMode && stdin.setRawMode(true)

  const keymap = qov.keymap
  const fragReg = /\x1b\[8m\s*\x1b\[0m/g

  let isGoto = false; let answer = ''

  stdin.on('keypress', (str, key) => {
    const name = key.name
    const total = qov.slides.length

    let index = qov.index

    const tip = `[?] Enter slide index(1 - ${total}): `

    // Waiting input of user
    if (isGoto) {
      if (name === 'return') {
        isGoto = false
        if (/\d*/.test(answer) && answer > 0 && answer <= total) {
          qov.render(answer - 1)
        } else {
          qov.render(index)
        }
        answer = ''
        hideCursor()
        return
      }

      tty.write(name)
      answer += name
      return
    }

    switch (name) {
      case keymap.quit:
        readline.cursorTo(tty, 0, tty.rows)
        tty.write(EOL)

        showCursor()

        process.exit()

        break

      case keymap.next:
        showNext(qov, fragReg)
        break

      case keymap.prev:
        index--
        if (index >= 0) {
          qov.render(index)
        }
        break

      case keymap.home:
        qov.render(0)
        break

      case keymap.last:
        qov.render(total - 1)
        break

      case keymap.goto:
        isGoto = true
        showCursor()

        readline.cursorTo(tty, 0, tty.rows)
        readline.clearLine(tty, 0)

        tty.write(tip)
        break

      case keymap.play:
        if (qov.timer) return

        const fraglength = qov.frags.length
        const lastFrag = qov.frags[fraglength - 1]

        qov.timer = setInterval(() => {
          if (qov.index === total - 1 && qov.fragIndex === lastFrag.length) {
            clearInterval(qov.timer)
            return
          }

          showNext(qov, fragReg)
        }, qov.step)
        break

      case keymap.stop:
        clearInterval(qov.timer)
        break

      case 'default':
        break
    }
  })
}
