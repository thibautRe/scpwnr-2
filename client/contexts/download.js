import React from 'react'
import produce from 'immer'
import { DOWNLOAD_STATUSES } from '../constants'

const DownloadContext = React.createContext({})

export const DownloadProvider = ({ children }) => {
  const [downloadList, setDownloadList] = React.useState([])

  return (
    <DownloadContext.Provider
      value={{
        downloadList,
        isDownloading: () =>
          downloadList.some(
            (item) => item.status === DOWNLOAD_STATUSES.downloading,
          ),
        addToDownloadList: (name) => {
          setDownloadList((l) => [
            ...l,
            { name, status: DOWNLOAD_STATUSES.downloading },
          ])
        },
        setSuccessDownload: (name, payload) => {
          setDownloadList(
            produce((prevState) => {
              const item = prevState.find((i) => i.name === name)
              item.status = DOWNLOAD_STATUSES.downloaded
              item.payload = payload
            }),
          )
        },
        setFailDownload: (name) => {
          setDownloadList(
            produce((prevState) => {
              prevState.find((i) => i.name === name).status =
                DOWNLOAD_STATUSES.errored
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
