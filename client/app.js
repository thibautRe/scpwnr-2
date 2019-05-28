import React from 'react'
import { createGlobalStyle } from 'styled-components'

import SoundList from './components/soundsList'
import DownloadInput from './components/downloadInput'
import DownloadList from './components/downloadList'
import { COLORS } from './styles'
import { DownloadProvider } from './contexts/download'

import font from './fonts/ObjectSans-Regular.woff'

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: Spectral;
    font-weight: 500;
    src: url(${font}) format("woff");
    font-display: swap;
  }

  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: "Spectral", sans-serif;
    color: ${COLORS.black};
  }

  body {
    margin: 0;
  }

  *, *::after, *::before {
    box-sizing: inherit
  }
`

const App = () => (
  <DownloadProvider>
    <GlobalStyles />
    <DownloadInput />
    <DownloadList />
    <SoundList />
  </DownloadProvider>
)

export default App
