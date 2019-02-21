import React from 'react'
import { createGlobalStyle } from 'styled-components'

import SoundList from './components/soundsList'
import DownloadInput from './components/downloadInput'

import font from './fonts/ObjectSans-Regular.woff'

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: Spectral;
    font-weight: 500;
    src: url(${font}) format("woff");
  }

  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: "Spectral", sans-serif;
  }

  body {
    margin: 0;
  }

  *, *::after, *::before {
    box-sizing: inherit
  }
`

const App = () => (
  <>
    <GlobalStyles />
    <DownloadInput />
    <SoundList />
  </>
)

export default App
