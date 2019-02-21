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
  border: 3px solid rgba(0, 0, 0, 0.6);
  background: white;
  transition: border-color ${TRANSITIONS.m};

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
  transform: translateX(-200%);
  transition: transform ${TRANSITIONS.m};
  z-index: -1;

  ${Input}:focus ~ &,
  &:focus,
  &:active {
    transform: translateX(0px);
  }
`

const DownloadInput = () => {
  const [downloadValue, setDownloadInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        const value = downloadValue
        setDownloadInputValue('')
        setIsLoading(true)
        const response = await fetch(`/download/${value}`)
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
      <Button type="submit">{isLoading ? '🐦' : 'Go'}</Button>
    </Form>
  )
}

export default DownloadInput
