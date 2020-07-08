import React from "react"
import { Link } from "gatsby"

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
        martin cartledge
      </h5>
      <h5
        style={{
          fontFamily: `Montserrat, sans-serif`,
          width: `5.5rem`,
          padding: `.5rem`,
        }}
      >
        <a
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
          }}
          href="/"
        >
          home
        </a>
      </h5>
      <h5 style={{ width: `5.5rem`, padding: `.5rem` }}>
        <a
          alt="martin-cartledge-email"
          href="mailto:martin@hey.com"
          target="_blank"
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
            fontFamily: `Montserrat, sans-serif`,
          }}
        >
          email
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
          alt="martin-cartledge-medium"
          href="https://medium.com/@spindriftboi"
          target="_blank"
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
            fontFamily: `Montserrat, sans-serif`,
          }}
        >
          medium
        </a>
      </h5>
      <h5 style={{ width: `5.5rem`, padding: `.5rem` }}>
        <a
          alt="martin-cartledge-linkedin"
          href="https://www.linkedin.com/in/martincartledge/"
          target="_blank"
          style={{
            boxShadow: `none`,
            color: `#cc6b87`,
            fontFamily: `Montserrat, sans-serif`,
          }}
        >
          linkedin
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
