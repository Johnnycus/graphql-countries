import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

import { GET_LOADING } from '../utils/queries'

const Nav = styled.div`
  position: relative;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
  color: white;
`

const Inner = styled.div`
  height: 10vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 38px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`

const waving = keyframes`
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
`

const Waves = styled.div`
  svg {
    position: relative;
    width: 100%;
    height: 10vh;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 150px;

    @media (max-width: 768px) {
      height: 40px;
      min-height: 40px;
    }

    g > use {
      animation: ${waving} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }

    g.pause > use {
      animation-play-state: paused;
    }

    g > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }

    g > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }

    g > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }

    g > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
`

const Header = () => {
  const {
    data: { loading },
  } = useQuery(GET_LOADING)

  return (
    <Nav>
      <Inner>
        <h1>
          <Link to="/">Geopedia</Link>
        </h1>
      </Inner>

      <Waves>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={loading ? 'run' : 'pause'}>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </Waves>
    </Nav>
  )
}

export default Header
