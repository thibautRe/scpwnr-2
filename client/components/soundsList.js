import React from 'react'

import SoundListItem from './soundListItem'

const getSoundlist = async () => {
  const response = await fetch('/sounds/')
  const { sounds } = await response.json()
  return sounds
}

const useSoundList = () => {
  const [soundlist, setSoundlist] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    getSoundlist().then((sounds) => {
      setSoundlist(sounds)
      setIsLoading(false)
    })
  }, [])

  return { soundlist, isLoading }
}

const SoundList = () => {
  const { soundlist, isLoading } = useSoundList()

  if (isLoading) return <div>Loading...</div>

  if (soundlist.length === 0) {
    return <div>Nothing to show here</div>
  }

  return soundlist.map((sound) => (
    <SoundListItem key={sound.filename} {...sound} />
  ))
}

export default SoundList
