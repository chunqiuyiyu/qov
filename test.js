const test = require('ava')
const {
  len, height, padMid, EOL, Mid, pipe, center, left, tagged, escapeLen,
  tty, isColored
} = require('./lib/utils')
const { red, paint } = require('./lib/colors')
const Qov = require('./index')

const qov = new Qov()

test('Wrap function to tagged templates.', t => {
  const a = str => str + 'a'

  t.deepEqual(tagged(a)`qov`, 'qova')
  t.deepEqual(tagged(a)`qov${'bc'}`, 'qovbca')
})

test('Measure length of string.', t => {
  t.deepEqual(len('qov'), 3)
  t.deepEqual(len(red('qov')), 3)
})

test('Create slide function.', t => {
  qov.section`${'this'} is a ${'te' + 'st'}.`
  t.deepEqual(qov.slides[0], Mid(center('this is a test.'), tty.rows))
})

test('Measure height of string.', t => {
  t.deepEqual(height('qov'), 1)
  t.deepEqual(height(`q${EOL}o${EOL}v`), 3)
})

test('Center string in given width.', t => {
  t.deepEqual(padMid('qov', 6), '  qov ')
  t.deepEqual(padMid('qov', 7), '  qov  ')
  t.deepEqual(padMid('qov', 1), 'qov')
})

test('Center string in vertical.', t => {
  t.deepEqual(Mid('qov', 6), `${EOL.repeat(2)}qov${EOL.repeat(3)}`)
  t.deepEqual(Mid(`q${EOL}o${EOL}v`, 5), EOL + `q${EOL}o${EOL}v` + EOL)
})

test('Call functions in order', t => {
  const a = str => str + 'a'
  const b = str => str + 'b'
  const c = str => str + 'c'

  t.deepEqual(pipe(a, b, c)('qov'), 'qovabc')
})

test('Align string in left.', t => {
  t.deepEqual(left`qov\nis a CLI tool`, 'qov          \nis a CLI tool')
  t.deepEqual(left`qov\nis a ${red('CLI')} tool`,
    `qov          \nis a ${red('CLI')} tool`)
})

test('Calc ANSI escape length in given strings.', t => {
  t.deepEqual(escapeLen('qov'), 0)
  t.deepEqual(escapeLen(red('qov')), 9)
  t.deepEqual(escapeLen(paint('red', 'white', 'qov')), 14)
})

test('Check strings is colored or not.', t => {
  t.deepEqual(isColored('qov'), false)
  t.deepEqual(isColored(red('qov')), true)
})
