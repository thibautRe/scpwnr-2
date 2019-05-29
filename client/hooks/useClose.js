import React from 'react'

export default () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef()
  React.useEffect(() => {
    if (!isOpen) return
    const onKeydown = (e) => {
      if (e.keyCode !== 27) return
      setIsOpen(false)
    }
    const onClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return
      setIsOpen(false)
    }

    document.addEventListener('keydown', onKeydown)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('click', onClick)
    }
  }, [isOpen, ref.current])

  return { isOpen, setIsOpen, ref }
}
