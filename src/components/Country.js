import React, { useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import { flag } from 'country-emoji'

import { COUNTRY_QUERY } from '../utils/queries'

const Container = styled.div`
  z-index: 1;
  margin: 30px 160px 0 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-height: 150px;

  h1 {
    margin-bottom: 7.5px;
    font-size: 34px;
  }

  span {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    margin-right: 10px;

    h1 {
      font-size: 28px;
    }

    span {
      font-size: 22px;
    }
  }
`

const Country = ({
  match: {
    params: { code },
  },
}) => {
  const client = useApolloClient()

  const {
    loading,
    error,
    data: { country },
  } = useQuery(COUNTRY_QUERY, { variables: { code } })

  useEffect(() => {
    client.writeData({ data: { loading } })
  }, [client, loading])

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('countries')) || []

    country && arr.push({ code, name: country.name })

    const countries = Array.from(new Set(arr.map(a => a.code))).map(code => {
      return arr.find(a => a.code === code)
    })

    localStorage.setItem('countries', JSON.stringify(countries))
  }, [country && country.name])

  if (loading) return <Container />
  if (error) return <p>Error!</p>

  const emoji = flag(code)

  return (
    <Container>
      <h1>
        {country.name} {emoji}
      </h1>

      <span>Currency: {country.currency}</span>
      <span>Area Code: +{country.phone}</span>
    </Container>
  )
}

export default Country
