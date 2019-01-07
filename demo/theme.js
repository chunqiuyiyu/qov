const {
  blue, red, magenta, green, black, cyan
} = require('../lib/colors')

module.exports = {
  default: green,

  comment: green,
  prolog: green,
  doctype: green,
  cdata: green,

  punctuation: magenta,
  namespace: magenta,

  property: blue,
  tag: blue,
  boolean: blue,
  number: blue,
  constant: blue,
  symbol: blue,
  deleted: blue,

  selector: red,
  'attr-name': red,
  string: red,
  char: red,
  builtin: red,
  url: red,
  inserted: red,

  entity: black,

  atrule: blue,
  'attr-value': blue,
  keyword: blue,

  function: blue,
  'class-name': blue,

  regex: cyan,
  variable: cyan,

  important: red,
  bold: red,
  italic: red,
}
