import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const COUNTRY_QUERY = gql`
  query COUNTRY_QUERY($code: String!) {
    country(code: $code) {
      name
      currency
      phone
    }
  }
`

const Country = ({
  match: {
    params: { code },
  },
}) => {
  const {
    loading,
    error,
    data: { country },
  } = useQuery(COUNTRY_QUERY, { variables: { code } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <>
      <h1>{country.name}</h1>

      <h2>Currency: {country.currency}</h2>
      <h2>Area Code: +{country.phone}</h2>
    </>
  )
}

export default Country
