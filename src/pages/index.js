import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignUpForm from "../components/signupForm"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      <Bio />
      <div
        style={{
          width: `100%`,
          maxWidth: `780px`,
          margin: `0px auto`,
          flex: `1 0 auto`,
        }}
      >
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} style={{ marginBottom: `3rem` }}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                    fontFamily: `Montserrat, sans-serif`,
                  }}
                >
                  <Link
                    style={{
                      boxShadow: `none`,
                      color: `#cc6b87`,
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
            </article>
          )
        })}
      </div>
      <footer>
        <SignUpForm />
      </footer>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            # description
          }
        }
      }
    }
  }
`
