const {
  blue, red, green, paint
} = require('./colors')
const { reset, EOL, clean, pipe, PAD, tagged } = require('./utils')

const conceal = str => `\x1b[8m${str}\x1b[0m`
const fragment = conceal

module.exports = {
  blod: str => `\x1b[1m${str}\x1b[0m`,
  faint: str => `\x1b[2m${str}\x1b[0m`,
  italic: str => `\x1b[3m${str}\x1b[0m`,
  underline: str => `\x1b[4m${str}\x1b[0m`,
  slowBlink: str => `\x1b[5m${str}\x1b[0m`,
  rapidBlink: str => `\x1b[6m${str}\x1b[0m`,
  reverse: str => `\x1b[7m${str}\x1b[0m`,
  conceal: str => `\x1b[8m${str}\x1b[0m`,
  crossedOut: str => `\x1b[9m${str}\x1b[0m`,

  // Use concenal() to mark fragment
  fragFlag: '\x1b[8m',

  // Customize code highlight style
  pre: str => {
    const commentsReg = /\/\/\s.*/g
    const stringsReg = /'.*'|`.*`/g
    const keyWordsReg = /const|new|require/g
    // Nested colored strings need to set color again
    const colorHead = '\x1b[47m\x1b[30m'

    let comments, strings
    while (comments = commentsReg.exec(str)) {
      str = str.replace(comments[0], green(comments))
    }

    while (strings = stringsReg.exec(reset(str))) {
      str = str.replace(strings[0], red(strings) + colorHead)
    }

    const keyWords = ['const', 'require', 'new']
    keyWords.map(item => {
      const reg = new RegExp(`${item}`, 'g')
      str = str.replace(reg, blue(item) + colorHead)
    })

    return str.split(EOL).map(
      item => paint('white', 'black', item)
    ).join(EOL)
  }

}
