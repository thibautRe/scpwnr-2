import React from 'react'
import styled from 'styled-components'

import SoundListItem, { SoundListLoading } from './soundListItem'

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

const SoundListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SoundList = () => {
  const { soundlist, isLoading } = useSoundList()

  if (isLoading)
    return (
      <SoundListWrapper>
        {new Array(10).fill(null).map((_, index) => (
          <SoundListLoading key={index} />
        ))}
      </SoundListWrapper>
    )

  if (soundlist.length === 0) {
    return <div>Nothing to show here</div>
  }

  return (
    <SoundListWrapper>
      {soundlist.map((sound) => (
        <SoundListItem key={sound.filename} {...sound} />
      ))}
      {new Array(10).fill(null).map((_, index) => (
        <SoundListLoading key={index} />
      ))}
    </SoundListWrapper>
  )
}

export default SoundList
