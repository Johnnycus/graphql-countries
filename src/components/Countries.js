import React from 'react'
import { Link } from 'react-router-dom'

const Countries = ({ match: { url } }) => (
  <>
    <h1>Countries page...</h1>
    <Link to={`${url}/test`}>TEST</Link>
  </>
)

export default Countries
