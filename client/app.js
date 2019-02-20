import React from 'react'
import { createGlobalStyle } from 'styled-components'

import SoundList from './components/soundsList'
import DownloadInput from './components/downloadInput'

const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: sans-serif;
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
