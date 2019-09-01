import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.div``

const CountriesList = ({ countries }) => (
  <>
    {countries && (
      <List>
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
      </List>
    )}
  </>
)

export default CountriesList
