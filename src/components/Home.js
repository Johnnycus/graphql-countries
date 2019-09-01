import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { flag } from 'country-emoji'

const Container = styled.div`
  a {
    text-decoration: none;
    color: #543ab7;
  }
`

const Countries = styled.div`
  margin: 20px 120px;
  padding: 20px;
  font-size: 48px;
  text-align: center;
  border: 1px solid #543ab7;
  border-radius: 15px;

  @media (max-width: 768px) {
    margin: 20px 50px;
  }

  a {
    background: -webkit-linear-gradient(#543ab7, #00acc1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }
`

const Viewed = styled.div`
  text-align: center;

  h1 {
    font-size: 48px;
    color: #00acc1;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;

    a {
      color: #543ab7;
      font-size: 24px;
      padding: 7.5px;
    }
  }
`

const Home = () => {
  const client = useApolloClient()

  const [countries] = useState(
    localStorage.getItem('countries')
      ? JSON.parse(localStorage.getItem('countries')).sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        )
      : [],
  )

  useEffect(() => {
    client.writeData({ data: { loading: true } })
  }, [client])

  return (
    <Container>
      <Countries>
        <Link to="/countries">Countries</Link>
      </Countries>

      <Viewed>
        {countries && countries.length > 0 && (
          <>
            <h1>Recently viewed</h1>
            <div>
              {countries.map(({ code, name }) => {
                const emoji = flag(code)

                return (
                  <Link to={`/countries/${code}`} key={code}>
                    {name} {emoji}
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </Viewed>
    </Container>
  )
}

export default Home
