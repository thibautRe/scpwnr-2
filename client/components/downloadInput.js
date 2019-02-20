import React from 'react'

const DownloadInput = () => {
  const [downloadValue, setDownloadInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const value = downloadValue
        setDownloadInputValue('')
        setIsLoading(true)
        const response = await fetch(`/download/${value}`)
        setIsLoading(false)
      }}
    >
      <input
        type="text"
        value={downloadValue}
        onInput={(e) => setDownloadInputValue(e.target.value)}
      />
      {isLoading && 'Loading...'}
    </form>
  )
}

export default DownloadInput
