import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { COUNTRIES_QUERY } from '../utils/queries'

const CountriesList = styled.div``

const Countries = ({ match: { url }, match }) => {
  const client = useApolloClient()

  const {
    loading,
    error,
    data: { countries },
  } = useQuery(COUNTRIES_QUERY)

  const [ref, setRef] = useState(null)

  useEffect(() => {
    const code = window.location.pathname.substring(11)

    client.writeData({ data: { loading } })

    if (ref && code && countries && countries.length > 0) {
      const item = countries.findIndex(country => country.code === code)
      ref.scrollToItem(item, 'center')
    }
  }, [ref])

  const height = window.innerHeight - 183

  if (loading) return <CountriesList />
  if (error) return <p>Error!</p>

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          ref={el => {
            setRef(el)
          }}
          itemCount={countries.length}
          itemSize={200}
          height={height}
          width={width}
        >
          {({ index, style }) => (
            <CountriesList key={countries[index].code} style={style}>
              <Link to={`${url}/${countries[index].code}`}>
                <h1>{countries[index].name}</h1>
              </Link>

              <p>{countries[index].continent.name}</p>

              <ul>
                {countries[index].languages.map(lang => (
                  <li key={countries[index].code + lang.code}>
                    {lang.name} – {lang.native}
                  </li>
                ))}
              </ul>
            </CountriesList>
          )}
        </List>
      )}
    </AutoSizer>
  )
}

export default Countries
