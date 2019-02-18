module.exports = ({ name, artist, remixedBy, ft }) => {
  return `${artist ? `${artist} - ` : ''}${name || 'Untitled'}${
    remixedBy ? ` (${remixedBy} remix)` : ''
  }${ft ? ` (ft. ${ft})` : ''}`
}
