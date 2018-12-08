const readline = require('readline')
const styles = require('./lib/styles')
const keymap = require('./lib/keymap')
const colors = require('./lib/colors')

const {
  tty, padMid, EOL, Mid, height, center,
  hideCursor, left, pipe, tagged, PAD, len
} = require('./lib/utils')
const { faint, conceal, fragFlag } = styles

module.exports = class Qov {
  constructor (opts = {}) {
    this.slides = []
    this.fragments = []

    this.frags = []
    this.sliceIndex = 0

    this.index = 0
    this.fragIndex = this.fragCounter = this.escapeCounter = 0

    this.step = opts.step || 2000
    this.keymap = Object.assign(keymap, opts.keymap)

    // link extral apis
    this.styles =
    this.colors = colors

    require('./lib/controls')(this)
    hideCursor()
  }

  // String.raw() function
  section (...args) {
    tagged(slide => {
      if (slide.includes(fragFlag)) {
        this.frags.push(this.fragments.slice(this.sliceIndex))
        this.sliceIndex += this.fragments.length
      } else {
        this.frags.push('')
      }

      this.slides.push(Mid(center(slide), tty.rows))
    })(...args)
  }

  // Create fragments
  fragment (...args) {
    return tagged(fragment => {
      this.fragments.push(fragment)

      return fragment.split(EOL)
        .map(item => conceal(PAD.repeat(len(item))))
        .join(EOL)
    })(...args)
  }

  // Render slides
  render (index = 0) {
    const total = this.slides.length
    this.index = index

    readline.cursorTo(tty, 0, 0)
    readline.clearScreenDown(tty)

    tty.write(this.slides[this.index])

    // Footer counter
    tty.write(center(faint(`${this.index + 1} of ${total}`)))

    this.fragCounter = this.fragIndex = 0
  }
}
