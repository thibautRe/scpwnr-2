import React from 'react'

const SoundListItem = ({ tags, imgUrl }) => (
  <div>
    <img src={imgUrl} />
    <span>{tags.title}</span>
  </div>
)

export default SoundListItem
