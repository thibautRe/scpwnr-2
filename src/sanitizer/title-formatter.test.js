const formatter = require('./title-formatter')

const fixtures = [
  {
    name: 'Name',
    artist: 'Artist',
  },
  {
    name: 'Name',
    artist: 'Artist',
    remixedBy: 'RemixedBy',
  },
  {
    name: 'Name',
    artist: 'Artist',
    remixedBy: 'RemixedBy',
    ft: 'Featuring',
  },
  {
    artist: 'Artist',
  },
  {
    name: 'Name',
    remixedBy: 'RemixedBy',
  },
  {
    artist: 'artist',
    remixedBy: 'RemixedBy',
  },
]

test('title formatter', () => {
  fixtures.forEach((titleAST) =>
    expect(formatter(titleAST)).toMatchSnapshot(JSON.stringify(titleAST)),
  )
})
