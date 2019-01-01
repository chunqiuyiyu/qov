const Qov = require('../index')
const logo = require('./logo')
const { left, pipe } = require('../lib/utils')
const {
  cyan, red, blue, white, paint, yellow, magenta
} = require('../lib/colors')
const {
  blod, italic, pre, faint, underline, slowBlink, rapidBlink,
  reverse, crossedOut
} = require('../lib/styles')
const ervy = require('ervy')
const { bar, pie, bullet, donut, gauge, scatter } = ervy

const qov = new Qov({
  step: 1500
})

// Slide one
qov.section`${logo}

${('The terminal presentation tool').toUpperCase()}

${green('Default Controls')}

L ${blue('Next')} K ${blue('Prev')}
H ${blue('Home')} J ${blue('Last')}
P ${blue('Play')} S ${blue('Stop')}
G ${blue('Goto')} Q ${blue('Quit')}

Developed by ${cyan('chunqiuyiyu')} with ${red('❤️')}`

// Slide two
qov.section`Features
${left`
• No third-party dependencies
• Tagged template literals
• Styled characters
• Fragments support
• Customized keyBinding
• Auto-sliding
• Easy to work with other libraries`}`

// Slide three
qov.section`Installation

${paint('white', 'black', ' npm install qov ')}

Usage

${pipe(left, pre)`
 const Qov = require('qov')
 const qov = new Qov()

 // Prepare slides to render
 qov.section\`Section One\`            
 qov.section\`Section Two\`           

 // Expression interpolation
 qov.section\`Section $\{() => 'Three'}\` 

 // Render slides
 qov.render()
`}`

// Slide four
qov.section`APIs
${left`
${blue('Constructor')}

${green('const qov = new Qov({ step?, keymap? })')}

step: milliseconds between auto-sliding, default is 2000.
keymap: customize keyBindings by yourself.

${blue('Styles')}

${green('qov.styles.<Style>(str)')}

Style: style name.
str: characters which you want to render.

${blod('blod')} ${faint('faint')} ${italic('italic')} ${underline('underline')} ${slowBlink('slowBlink')} ${rapidBlink('rapidBlink')} ${reverse('reverse')} ${crossedOut('crossedOut')}
`}`

// Slide five
qov.section`Fragments
${left`
${blue('Colors API')}

Use paint() functon to render characters with color and backgroundColor.

${qov.fragment`${green(`qov.colors.<Color>(str, isBg?)
qov.colors.paint(bgColor, fgColor, str)`)}`}

${qov.fragment`Color, bgColor, fgColor: color name.
isBg: render characters by backgroundColor or not, default is false.`}

${qov.fragment`${paint('white', 'black', ' black with white background ')}

${yellow('yellow')} ${red('red')} ${blue('blue')} ${green('green')} ${cyan('cyan')} ${magenta('magenta')}`}`}`

// Slide six
const data = [
  { key: 'A', value: 5, style: '*' },
  { key: 'B', value: 3, style: '+' },
  { key: 'C', value: 11 },
  { key: 'D', value: 9, style: '#', padding: 1 },
  { key: 'E', value: 1, style: ervy.bg('red') },
  { key: 'F', value: 5, style: ervy.bg('green') },
  { key: 'G', value: 7, style: ervy.bg('blue') },
  { key: 'H', value: 8, style: ervy.bg('cyan') },
  { key: 'I', value: 2, style: ervy.bg('yellow') }
]

qov.section`Much More
${left`
Via ${blue('Tagged template literals')}, you can use other JS packages in Qov slides.
${yellow('> The only requirement is that package needs to return a string.')}`}


${ervy.bar(data)}

Ervy Bar Charts`

// Slide seven
qov.section`- The End -`

qov.render()
