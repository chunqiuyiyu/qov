const bgColors = {
  'black': '40',
  'red': '41',
  'green': '42',
  'yellow': '43',
  'blue': '44',
  'magenta': '45',
  'cyan': '46',
  'white': '47'
}

module.exports = {
  // Paint string with backgroundColor an foregroundColor
  paint: (bg, fg, str) =>
    `\x1b[${bgColors[bg]}m\x1b[${bgColors[fg] - 10}m${str}\x1b[0m`,

  // Colors
  black: (str, isBg = false) => isBg
    ? `\x1b[40m${str}\x1b[0m` : `\x1b[30m${str}\x1b[0m`,

  red: (str, isBg = false) => isBg
    ? `\x1b[41m${str}\x1b[0m` : `\x1b[31m${str}\x1b[0m`,

  green: (str, isBg = false) => isBg
    ? `\x1b[42m${str}\x1b[0m` : `\x1b[32m${str}\x1b[0m`,

  yellow: (str, isBg = false) => isBg
    ? `\x1b[43m${str}\x1b[0m` : `\x1b[33m${str}\x1b[0m`,

  blue: (str, isBg = false) => isBg
    ? `\x1b[44m${str}\x1b[0m` : `\x1b[34m${str}\x1b[0m`,

  magenta: (str, isBg = false) => isBg
    ? `\x1b[45m${str}\x1b[0m` : `\x1b[35m${str}\x1b[0m`,

  cyan: (str, isBg = false) => isBg
    ? `\x1b[46m${str}\x1b[0m` : `\x1b[36m${str}\x1b[0m`,

  white: (str, isBg = false) => isBg
    ? `\x1b[47m${str}\x1b[0m` : `\x1b[37m${str}\x1b[0m`
}
