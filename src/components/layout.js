import React from "react"

import { rhythm } from "../utils/typography"

const Layout = ({ children }) => {
  const header = (
    <ul
      style={{
        display: `flex`,
        justifyContent: `space-between`,
        flexWrap: `wrap`,
      }}
    >
      <h5
        style={{
          fontFamily: `Montserrat, sans-serif`,
          width: `5.5rem`,
          padding: `.5rem .5rem .5rem 0`,
        }}
      >
        <a
          style={{
            boxShadow: `none`,
            color: `#000000e6`,
          }}
          href="/"
        >
          martin cartledge
        </a>
      </h5>
      <h5 style={{ width: `5.5rem`, padding: `.5rem` }}>
        <a
          alt="martin-cartledge-twitter"
          href="https://twitter.com/spindriftboi"
          target="_blank"
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
            fontFamily: `Montserrat, sans-serif`,
          }}
        >
          twitter
        </a>
      </h5>
      <h5 style={{ width: `5.5rem`, padding: `.5rem` }}>
        <a
          alt="martin-cartledge-github"
          href="https://github.com/martincartledge"
          target="_blank"
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
            fontFamily: `Montserrat, sans-serif`,
          }}
        >
          github
        </a>
      </h5>
    </ul>
  )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: `900px`,
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        minHeight: `100vh`,
      }}
    >
      <header>{header}</header>
      <>{children}</>
    </div>
  )
}

export default Layout
