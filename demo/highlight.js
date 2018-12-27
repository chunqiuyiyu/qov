
const { JSDOM } = require('jsdom')
const Prism = require('prismjs')
const { EOL, tagged, PAD, len } = require('../lib/utils')
const { paint } = require('../lib/colors')

module.exports = function highlight (theme) {
  return tagged((code) => {
    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript')

    const dom = new JSDOM(`<!DOCTYPE html>${html}`)
    const root = dom.window.document.body

    const tokens = root.querySelectorAll('.token')

    const colorHead = '\x1b[47m\x1b[30m'

    let parsed = root.innerHTML;
    tokens.forEach((token) => {
      const type = token.className.replace('token ', '')
      const marker = theme[type] || function(s) { return s };
      parsed = parsed.replace(token.outerHTML, marker(token.innerHTML) + colorHead)
    });

    parsed = parsed.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    parsed = ' ' + EOL + parsed;

    parsed = parsed.split(EOL).map(
      item => {
        return paint('white', 'black', ' ' + item + PAD.repeat(len(parsed) - len(item)))
      }
    ).join(EOL)

    return parsed
  })
}
