const parser = require('./title-parser')

const fixtures = [
  'Black Coast - TRNDSTTR (Lucian Remix) [feat. M. Maggie]',
  'Maff Boothroyd - Miss You 🍉',
  'Blank (feat. Kennedi)',
  'BIJOU - Memories',
  'Tails X Inverness – Skeleton Ft. Nevve (Voorhees Remix)',
]

test('title parser', () => {
  fixtures.forEach((title) => expect(parser(title)).toMatchSnapshot(title))
})
