import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { flag } from 'country-emoji'

import { COUNTRIES_QUERY } from '../utils/queries'

const CountriesList = styled.div``

const SearchField = styled.input`
  z-index: 1;
  position: absolute;
  top: 5px;
  left: 50%;
  text-align: center;
  width: calc(50% - 160px);
  padding: 5px 0;
  font-size: 20px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: auto;
    font-size: 16px;
  }
`

const Countries = ({ match: { url }, match }) => {
  const client = useApolloClient()

  const {
    loading,
    error,
    data: { countries },
  } = useQuery(COUNTRIES_QUERY)

  const [localCountries, setLocalCountries] = useState([])

  const [ref, setRef] = useState(null)

  useEffect(() => {
    const code = window.location.pathname.substring(11)

    client.writeData({ data: { loading } })

    countries && countries.length > 0 && setLocalCountries(countries)

    if (ref && code && countries && countries.length > 0) {
      const item = countries.findIndex(country => country.code === code)

      ref.scrollToItem(item + 1, 'center')
    }
  }, [client, loading, countries, ref])

  const height = window.innerHeight - 183

  const [search, setSearch] = useState('')

  const handleSearch = e => {
    const { value } = e.target

    setSearch(value)

    const searchCountries = countries.filter(str => {
      return str.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })

    setLocalCountries(searchCountries)
  }

  if (loading) return <CountriesList />
  if (error) return <p>Error!</p>

  return (
    <>
      <SearchField
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for country"
      />
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            ref={el => {
              setRef(el)
            }}
            itemCount={localCountries.length}
            itemSize={200}
            height={height}
            width={width}
          >
            {({ index, style }) => {
              const { code, name, continent, languages } = localCountries[index]
              const emoji = flag(code)

              return (
                <CountriesList key={code} style={style}>
                  <h1>
                    <Link to={`${url}/${code}`}>
                      {name} {emoji}
                    </Link>
                  </h1>

                  <p>{continent.name}</p>

                  <ul>
                    {languages.map(lang => (
                      <li key={code + lang.code}>
                        {lang.name} – {lang.native}
                      </li>
                    ))}
                  </ul>
                </CountriesList>
              )
            }}
          </List>
        )}
      </AutoSizer>
    </>
  )
}

export default Countries
