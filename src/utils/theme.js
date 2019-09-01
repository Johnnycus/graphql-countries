import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Acme&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Acme', 'Fira Sans', 'Helvetica Neue',
      sans-serif;
    overflow: hidden;
  }
`

export const theme = {}
