import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

const GET_LOADING = gql`
  {
    loading @client
  }
`

const Container = styled.div`
  /* justify-content: center; */
  display: flex;
`

const Layout = ({ history, children }) => {
  // const {
  //   client,
  //   data: { loading },
  // } = useQuery(GET_LOADING)

  useEffect(() => {
    console.log(history)
  })

  // useEffect(() => {
  // history.action === 'PUSH'
  // ? client.writeData({ data: { loading: true } })
  // : client.writeData({ data: { loading: false } })
  // console.log('> Router', history)
  // }, [history, client])

  return <Container>{children}</Container>
}

export default withRouter(Layout)
