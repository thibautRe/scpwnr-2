import React from 'react'
import { createGlobalStyle } from 'styled-components'

import SoundList from './components/soundsList'

const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-y: scroll;
    font-family: sans-serif;
  }

  *, *::after, *::before {
    box-sizing: inherit
  }
`

const App = () => (
  <>
    <GlobalStyles />
    <SoundList />
  </>
)

export default App
