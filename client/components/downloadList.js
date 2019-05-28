import React from 'react'
import styled from 'styled-components'

import { useDownload } from '../contexts/download'
import { DOWNLOAD_STATUSES } from '../constants'
import { borderRadius, COLORS, SIZES, TRANSITIONS } from '../styles'

const DownloadListItem = ({ name, payload, status }) => (
  <div>
    {status === DOWNLOAD_STATUSES.downloaded && payload && (
      <img src={payload.imgUrl} />
    )}
    <strong>{name}</strong>
    <span>Status: {status}</span>
  </div>
)

const Button = styled.button`
  position: relative;
  margin: ${SIZES.m};
  padding: ${SIZES.s} ${SIZES.l};
  background-color: ${COLORS.white};
  border: none;
  border-radius: ${borderRadius};
  cursor: pointer;

  &:-moz-focusring,
  &:hover {
    svg {
      fill: ${COLORS.accent};
    }
  }

  svg {
    fill: ${COLORS.black};
    transition: fill ${TRANSITIONS.m};
    width: 42px;
  }
`

const Amt = styled.span`
  position: absolute;
  top: 1px;
  right: 1px;
  background: ${COLORS.accent};
  color: ${COLORS.white};
  padding: 4px 8px;
  border-radius: 100px;
  font-size: 9px;
`

const DownloadListContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: ${COLORS.white};
  transform: translate(${(p) => (p.isOpen ? '0px' : '-110%')});
  transition: transform ${TRANSITIONS.m};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const DownloadListButton = ({ onClick, amt = 0 }) => (
  <Button onClick={onClick}>
    <svg viewBox="0 0 1000 1000" aria-hidden>
      <path d="M561.3 423.4H438.8v245h-91.9L500 852.2l153.1-183.8h-91.8z" />
      <path d="M854.8 399.3a199.2 199.2 0 0 0-242.9-120.9 275.7 275.7 0 0 0-510 139 183.8 183.8 0 0 0 91.9 342.9h137.8L280.5 699h-86.9a122.5 122.5 0 0 1-27.9-241.8 214.4 214.4 0 0 1 416.9-95.8A137.9 137.9 0 0 1 805.3 454h.9a122.5 122.5 0 0 1 0 245h-86.9l-51.1 61.3H806a184 184 0 0 0 183.8-183.8 183.4 183.4 0 0 0-135-177.2z" />
    </svg>
    {amt > 0 && <Amt>{amt}</Amt>}
  </Button>
)

const DownloadList = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef()
  const { downloadList } = useDownload()

  React.useEffect(() => {
    if (!isOpen) return
    const onKeydown = (e) => {
      if (e.keyCode !== 27) return
      setIsOpen(false)
    }
    const onClick = (e) => {
      if (!containerRef.current || containerRef.current.contains(e.target))
        return
      setIsOpen(false)
    }

    document.addEventListener('keydown', onKeydown)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('click', onClick)
    }
  }, [isOpen])

  return (
    <>
      <DownloadListButton
        onClick={() => setIsOpen((s) => !s)}
        amt={
          downloadList.filter(
            (item) => item.status === DOWNLOAD_STATUSES.downloading,
          ).length
        }
      />
      <DownloadListContainer isOpen={isOpen} ref={containerRef}>
        {downloadList.map((item) => (
          <DownloadListItem {...item} key={item.name} />
        ))}
      </DownloadListContainer>
    </>
  )
}

export default DownloadList
