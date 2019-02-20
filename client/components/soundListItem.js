import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 20%;
  padding: 18px;
`

const ImgWrapper = styled.div`
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
  background-color: rgb(200, 237, 106, 0.8);
  transition: opacity 0.3s;

  ${ImgWrapper}:hover & {
    opacity: 0;
  }
`

const BlurryImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
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
  transition: transform 0.15s ease-out;

  ${ImgWrapper}:hover & {
    transform: translateY(0px);
  }
`

const SoundListItem = ({ tags, imgUrl }) => (
  <Wrapper>
    <ImgWrapper>
      <BlurryImg src={imgUrl} />
      <Img src={imgUrl} />
      <NameWrapper>
        <Artist>{tags.artist}</Artist>
        <Title>
          {tags.title} {tags.remixArtist && `(${tags.remixArtist} remix)`}
        </Title>
      </NameWrapper>
    </ImgWrapper>
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
