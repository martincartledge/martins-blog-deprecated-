/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
        flexWrap: `wrap`,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ margin: `1rem 0` }}>
        I love learning and sharing my knowledge with others. I also enjoy
        spending time with my wife and two Golden Retrievers, Nikita and Willow.
      </p>
      <span
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          minWidth: `20rem`,
        }}
      >
        <a
          alt="martin-cartledge-email"
          href="mailto:sayheytomartin@gmail.com"
          target="_blank"
          style={{
            boxShadow: `none`,
            textDecoration: `underline`,
            color: `#cc6b87`,
          }}
        >
          Email
        </a>
        <a
          alt="martin-cartledge-github"
          href="https://github.com/martincartledge"
          target="_blank"
          style={{
            boxShadow: `none`,
            textDecoration: `underline`,
            color: `#cc6b87`,
          }}
        >
          GitHub
        </a>
        <a
          alt="martin-cartledge-medium"
          href="https://medium.com/@spindriftboi"
          target="_blank"
          style={{
            boxShadow: `none`,
            textDecoration: `underline`,
            color: `#cc6b87`,
          }}
        >
          Medium
        </a>
        <a
          alt="martin-cartledge-linkedin"
          href="https://www.linkedin.com/in/martincartledge/"
          target="_blank"
          style={{
            boxShadow: `none`,
            textDecoration: `underline`,
            color: `#cc6b87`,
          }}
        >
          LinkedIn
        </a>
      </span>
    </div>
  )
}

export default Bio
