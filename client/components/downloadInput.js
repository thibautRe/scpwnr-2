import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  position: relative;
  margin: 30vh auto;
  padding: 0 10px;
  max-width: 500px;
`

const Input = styled.input`
  display: block;
  flex: 1;
  padding: 10px 20px;
  font-family: inherit;
  border-radius: 8px;
  border: 3px solid rgba(0, 0, 0, 0.6);
`

const Label = styled.label`
  position: absolute;
  top: -6px;
  left: 20px;
  font-size: 12px;
  background: white;
  padding: 0px 10px;
  pointer-events: none;
`

const Button = styled.button`
  width: 50px;
  margin-left: 10px;
  border-radius: 8px;
  border: 3px solid transparent;
  color: white;
  background: rgba(0, 0, 0, 0.6);
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
      <Label>Download</Label>
      <Input
        type="text"
        value={downloadValue}
        placeholder="https://soundcloud.com/"
        onInput={(e) => setDownloadInputValue(e.target.value)}
      />
      <Button type="submit">{isLoading ? '🐦' : 'Go'}</Button>
    </Form>
  )
}

export default DownloadInput
