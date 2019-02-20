import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 20%;
  padding: 18px;

  @media (max-width: 900px) {
    width: 33%;
    padding: 10px;
  }

  @media (max-width: 375px) {
    width: 50%;
    padding: 6px;
  }
`

const AbsoluteWrapper = styled.div`
  position: relative;
  height: 0px;
  padding-bottom: 100%;
  overflow: hidden;
`

const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  transition: opacity 0.3s, transform 0.8s;

  ${AbsoluteWrapper}:hover & {
    transform: scale(0.97) translateY(2px);
  }
`

const MainImg = styled(Img)`
  background-color: rgb(0, 0, 0, 0.8);

  ${AbsoluteWrapper}:hover & {
    opacity: 0;
  }
`

const BlurryImg = styled(Img)`
  filter: blur(2px) saturate(0.3);
`

const Artist = styled.span`
  display: block;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Title = styled.span`
  display: block;
  font-size: 11px;
`

const NameWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 30px 10px 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0));
  color: white;
  transform: translateY(100%);
  transition: transform 0.15s;

  ${AbsoluteWrapper}:hover & {
    transform: translateY(0px);
  }
`

const SoundListItem = ({ tags, imgUrl }) => (
  <Wrapper>
    <AbsoluteWrapper>
      <BlurryImg src={imgUrl} />
      <MainImg src={imgUrl} />
      <NameWrapper>
        <Artist>{tags.artist}</Artist>
        <Title>
          {tags.title} {tags.remixArtist && `(${tags.remixArtist} remix)`}
        </Title>
      </NameWrapper>
    </AbsoluteWrapper>
  </Wrapper>
)

export const SoundListLoading = () => (
  <SoundListItem
    // Transparent 1px gif
    imgUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    tags={{}}
  />
)

export default SoundListItem
