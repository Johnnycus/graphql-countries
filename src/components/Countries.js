import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { flag } from 'country-emoji'

import { COUNTRIES_QUERY } from '../utils/queries'

const CountriesList = styled.div`
  h1 {
    margin-bottom: 2.5px;

    a {
      text-decoration: none;
      color: ${props => props.theme.purple};
    }
  }

  .continent {
    font-size: 22px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 5px 0 0;

    span {
      font-size: 20px;
      font-weight: 300;
    }
  }

  @media (min-width: 769px) {
    margin: 0 0 0 30px;
    width: calc(100% - 30px) !important;
  }

  @media (max-width: 768px) {
    margin: 0 0 0 2.5px;

    h1 {
      font-size: 22px;
    }

    .continent {
      font-size: 18px;
    }

    ul {
      span {
        font-size: 16px;
      }
    }
  }
`

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

const Countries = ({ match: { url } }) => {
  const client = useApolloClient()

  const {
    loading,
    error,
    data: { countries },
  } = useQuery(COUNTRIES_QUERY)

  const [localCountries, setLocalCountries] = useState([])

  const [ref, setRef] = useState(null)

  const mobile = window.innerWidth < 768

  useEffect(() => {
    const code = window.location.pathname.substring(11)

    client.writeData({ data: { loading } })

    countries &&
      countries.length > 0 &&
      setLocalCountries(
        countries.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        ),
      )

    if (ref && code && countries && countries.length > 0) {
      const item = countries.findIndex(country => country.code === code)

      ref.scrollToItem(item + 1, 'center')
    }
  }, [client, loading, countries, ref])

  const height = mobile ? window.innerHeight - 120 : window.innerHeight - 183

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
            itemSize={mobile ? 150 : 220}
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

                  <span className="continent">{continent.name}</span>

                  <ul>
                    {languages.map(lang => (
                      <li key={code + lang.code}>
                        <span>{lang.name}</span> – <span>{lang.native}</span>
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
