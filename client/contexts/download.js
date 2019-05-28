import React from 'react'
import produce from 'immer'

const DownloadContext = React.createContext({})

export const DownloadProvider = ({ children }) => {
  const [downloadList, setDownloadList] = React.useState([])
  React.useDebugValue(downloadList)

  return (
    <DownloadContext.Provider
      value={{
        downloadList,
        addToDownloadList: (name) => {
          setDownloadList((l) => [...l, { name, status: 'DOWNLOADING' }])
        },
        setSuccessDownload: (name, payload) => {
          setDownloadList(
            produce((prevState) => {
              const item = prevState.find((i) => i.name === name)
              item.status = 'DOWNLOADED'
              item.payload = payload
            }),
          )
        },
        setFailDownload: (name) => {
          setDownloadList(
            produce((prevState) => {
              prevState.find((i) => i.name === name).status = 'ERRORED'
            }),
          )
        },
      }}
    >
      {children}
    </DownloadContext.Provider>
  )
}

export const useDownload = () => React.useContext(DownloadContext)
