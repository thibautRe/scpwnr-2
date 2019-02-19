const remixedRegex = /[\(\[]([^\]\)]+?)\s(remix|flip|redo)[\)\]]/i
const getRemixInfo = (title) => {
  const regexResult = remixedRegex.exec(title) || undefined
  return (
    regexResult && {
      remixedBy: regexResult[1].trim(),
      remixType: regexResult[2].toLowerCase(),
    }
  )
}

const ftRegex = /[\(\[]\s*fe?a?t\.?([^\]\)]+?)[\)\]]/i
const getFtInfo = (title) => {
  const regexResult = ftRegex.exec(title)
  return regexResult && { ft: regexResult[1].trim() }
}

const artistRegex = /^(.+?)\s*[-–]/i
const getArtistInfo = (title) => {
  const regexResult = artistRegex.exec(title) || undefined
  return regexResult && { artist: regexResult[1].trim() }
}

const nameRegex = /(?:(?:.+?\s*[-–]\s*)|^)([^\(\[]+)/i
const getNameInfo = (title) => {
  const regexResult = nameRegex.exec(title) || undefined
  return regexResult && { name: regexResult[1].trim() }
}

module.exports = (title = '', artist) => {
  return {
    ...(artist && { artist }),
    ...getArtistInfo(title),
    ...getNameInfo(title),
    ...getFtInfo(title),
    ...getRemixInfo(title),
  }
}
