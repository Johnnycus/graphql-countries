import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/countries">Countries</Link>
  </>
)

export default Header
