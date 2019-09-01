import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'

import { COUNTRY_QUERY, COUNTRIES_QUERY } from '../utils/queries'
import CountriesList from './CountriesList'

const Container = styled.div`
  position: sticky;
  top: 0;
`

const Country = ({
  history: { action },
  match: {
    params: { code },
  },
}) => {
  const client = useApolloClient()

  const countryQuery = useQuery(COUNTRY_QUERY, { variables: { code } })

  const countriesQuery = useQuery(COUNTRIES_QUERY)

  useEffect(() => {
    client.writeData({
      data: { loading: countryQuery.loading || countriesQuery.loading },
    })
  })

  if (countryQuery.loading || countriesQuery.loading) return <Container />
  if (countryQuery.error || countriesQuery.error) return <p>Error!</p>

  return (
    <>
      {action === 'POP' ? (
        <SingleCountry country={countryQuery.data.country} />
      ) : (
        <Countries
          countries={countriesQuery.data.countries}
          country={countryQuery.data.country}
        />
      )}
    </>
  )
}

const SingleCountry = ({ country }) => (
  <Container>
    <h1>{country.name}</h1>

    <h2>Currency: {country.currency}</h2>
    <h2>Area Code: +{country.phone}</h2>
  </Container>
)

const Countries = ({ country, countries }) => (
  <>
    <CountriesList countries={countries} />

    <SingleCountry country={country} />
  </>
)

export default withRouter(Country)
