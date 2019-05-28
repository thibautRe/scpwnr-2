import React from 'react'
import { useDownload } from '../contexts/download'
import { DOWNLOAD_STATUSES } from '../constants'

const DownloadListItem = ({ name, payload, status }) => (
  <div>
    {status === DOWNLOAD_STATUSES.downloaded && payload && (
      <img src={payload.imgUrl} />
    )}
    <strong>{name}</strong>
    <span>Status: {status}</span>
  </div>
)

const DownloadList = () => {
  const { downloadList } = useDownload()

  return downloadList.map((item) => (
    <DownloadListItem {...item} key={item.name} />
  ))
}

export default DownloadList
