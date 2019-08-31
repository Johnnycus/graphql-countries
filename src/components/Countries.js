import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const COUNTRIES_QUERY = gql`
  query COUNTRIES_QUERY {
    countries {
      name
      code
      continent {
        name
      }
      languages {
        code
        name
        native
      }
    }
  }
`

const Countries = ({ match: { url } }) => {
  const {
    loading,
    error,
    data: { countries },
  } = useQuery(COUNTRIES_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <>
      <h1>Countries</h1>

      {countries.map(({ code, name, continent, languages }) => (
        <div key={code}>
          <Link to={`${url}/${code}`}>
            <h1>{name}</h1>
          </Link>

          <p>{continent.name}</p>

          <ul>
            {languages.map(lang => (
              <li key={code + lang.code}>
                {lang.name} – {lang.native}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
export default Countries
