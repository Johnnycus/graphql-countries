import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from './utils/theme'

import Header from './components/Header'
import Home from './components/Home'
import Countries from './components/Countries'
import Country from './components/Country'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />

      <Header />

      <Route exact path="/" component={Home} />

      <Container>
        <Route path="/countries" component={Countries} />
        <Route path="/countries/:code" component={Country} />
      </Container>
    </Router>
  </ThemeProvider>
)

export default App
