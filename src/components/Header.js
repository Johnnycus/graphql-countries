import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <Link>
    <Link to="/">Home</Link>
    <Link to="/countries">Countries</Link>
  </Link>
)

export default Header
