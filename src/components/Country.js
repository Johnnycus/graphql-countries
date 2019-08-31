import React from 'react'

const Country = ({
  match: {
    params: { country },
  },
}) => (
  <>
    <h1>{country}! page...</h1>
  </>
)

export default Country
