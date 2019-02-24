import React from 'react'
import styled from 'styled-components'
import { SIZES, borderRadius, COLORS, TRANSITIONS } from '../styles'

const Form = styled.form`
  display: flex;
  position: relative;
  margin: 20vh auto;
  padding: 0 ${SIZES.m};
  max-width: 500px;
`

const Input = styled.input`
  display: block;
  flex: 1;
  padding: ${SIZES.m} ${SIZES.l};
  font-family: inherit;
  border-radius: ${borderRadius};
  border: 3px solid ${COLORS.black};
  background: white;
  transition: border-color ${TRANSITIONS.m};

  ::placeholder {
    color: ${COLORS.black};
    opacity: 0.3;
  }

  &:focus {
    border-color: ${COLORS.accent};
  }
`

const Label = styled.label`
  position: absolute;
  top: -6px;
  left: 20px;
  font-size: 12px;
  background: white;
  padding: 0 ${SIZES.m};
  pointer-events: none;
  transition: color ${TRANSITIONS.m};

  ${Input}:focus + & {
    color: ${COLORS.accent};
  }
`

const Button = styled.button`
  width: 50px;
  margin-left: ${SIZES.m};
  border-radius: ${borderRadius};
  border: 3px solid transparent;
  color: white;
  background: ${COLORS.accent};
  font-family: inherit;
  z-index: -1;
  transform: translateX(${(p) => (p.isOut ? '0px' : '-200%')});
  transition: transform ${TRANSITIONS.m} ease-in-out;
  will-change: transform;
`

const DownloadInput = () => {
  const [downloadValue, setDownloadInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()

        setDownloadInputValue('')
        setIsLoading(true)

        await fetch(`/download/${downloadValue}`)
        setIsLoading(false)
      }}
    >
      <Input
        type="text"
        id="downloadInput"
        value={downloadValue}
        placeholder="https://soundcloud.com/"
        onInput={(e) => setDownloadInputValue(e.target.value)}
      />
      <Label for="downloadInput">Download</Label>
      <Button type="submit" isOut={!!downloadValue}>
        {isLoading ? '🐦' : 'Go'}
      </Button>
    </Form>
  )
}

export default DownloadInput
