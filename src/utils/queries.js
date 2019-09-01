import gql from 'graphql-tag'

export const GET_LOADING = gql`
  {
    loading @client
  }
`

export const COUNTRIES_QUERY = gql`
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

export const COUNTRY_QUERY = gql`
  query COUNTRY_QUERY($code: String!) {
    country(code: $code) {
      name
      currency
      phone
    }
  }
`
