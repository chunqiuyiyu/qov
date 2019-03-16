const EOL = '\n'
const PAD = ' '
const tty = process.stdout
const readline = require('readline')

// Wrap function to tagged templates
const tagged = fn => (strings, ...values) => fn(values.map(
  (val, i) => strings[i] + val
).join('') + strings[values.length])

// Clear all ANSI escape code
// eslint-disable-next-line
const reset = str => str.replace(/\x1b\[\d{1,2}m/g, '')

// Clear Normal code
// Nested colored strings need to clear normal escape code
// eslint-disable-next-line
const clean = str => str.replace(/\x1b\[0m/, '')

const len = str => {
  const lens = str.split(EOL).map(
    item => reset(item).length
  )
  return Math.max.apply(null, lens)
}

// ANSI escape code length in given strings
const escapeLen = str => {
  let result = 0
  // eslint-disable-next-line
  const top = str.match(/\x1b\[\d{2}m/g)
  // eslint-disable-next-line
  const tail = str.match(/\x1b\[0m/g)

  // console.log(JSON.stringify(str))
  if (top) result += top.length * 5
  if (tail) result += tail.length * 4

  return result
}

// Check strings is colored or not
// eslint-disable-next-line
const isColored = str => !!str.match(/\x1b\[3|4[0-7]m/)

const padMid = (str, width) => str.split(EOL).map(item => {
  const mid = Math.round((width - len(item)) / 2)
  const length = len(item)

  return length > width ? item.padEnd(width) : PAD.repeat(mid) + item +
    PAD.repeat(mid + ((mid * 2 + length) > width ? -1 : 0))
}).join(EOL)

const height = str => str.split(EOL).length ? str.split(EOL).length : 1
const center = str => padMid(str, tty.columns)

const Mid = (str, h) => {
  const strHeight = height(str)
  const mid = Math.floor((h - strHeight) / 2)

  return EOL.repeat(mid) + str +
    EOL.repeat(mid + ((mid * 2 + strHeight) < h ? 1 : 0))
}

// Text align: left
const left = tagged(str => str.split(EOL).map(
  item => item + PAD.repeat(len(str) - len(item))
).join(EOL))

// Call functions in order
const pipe = (...fns) => result => {
  const list = fns.slice()

  while (list.length > 0) {
    result = list.shift()(result)
  }

  return result
}

// Shower cursor
const showCursor = () => tty.write('\x1b[?25h')

// Hide cursor
const hideCursor = () => tty.write('\x1b[?25l')

// Render next slide with fragments support
const showNext = (qov, fragReg) => {
  let index = qov.index
  const currentFrag = qov.frags[index][qov.fragIndex]
  const slide = qov.slides[index]

  if (currentFrag) {
    currentFrag.split(EOL).map(frag => {
      const frags = fragReg.exec(slide)
      if (frags) {
        const regIndex = frags.index

        const offset = slide.slice(0, regIndex).split(EOL).length - 1
        const tmp = offset + qov.fragCounter * 8 + (isColored(slide) ? 9 : 0)

        const cursorX = (regIndex - tmp) % tty.columns
        readline.cursorTo(tty, cursorX, offset)
        tty.write(frag)

        qov.fragCounter++
      }
    })

    qov.fragIndex++
    return
  }

  index++
  if (index < qov.slides.length) {
    qov.fragCounter = 0
    fragReg.lastIndex = 0
    qov.fragIndex = 0
    qov.render(index)
  }
}

module.exports = {
  tty,
  len,
  height,
  padMid,
  center,
  Mid,
  EOL,
  reset,
  pipe,
  clean,
  showCursor,
  hideCursor,
  PAD,
  left,
  tagged,
  showNext,
  escapeLen,
  isColored
}
