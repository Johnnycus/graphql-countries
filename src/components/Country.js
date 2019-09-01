import React, { useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'

import { COUNTRY_QUERY } from '../utils/queries'

const Container = styled.div``

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
  })

  if (loading) return <Container />
  if (error) return <p>Error!</p>

  return (
    <Container>
      <h1>{country.name}</h1>

      <h2>Currency: {country.currency}</h2>
      <h2>Area Code: +{country.phone}</h2>
    </Container>
  )
}

export default Country
