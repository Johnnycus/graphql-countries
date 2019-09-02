import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Acme&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Acme', 'Fira Sans', 'Helvetica Neue',
      sans-serif;
  }
`

export const theme = { purple: '#543ab7', green: '#00acc1' }
