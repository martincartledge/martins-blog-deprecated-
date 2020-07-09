import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SignUpForm from "../components/signupForm"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} style={{ background: `red` }}>
      <SEO title="Martin Cartledge's Blog" />
      <div
        style={{
          width: `100%`,
          maxWidth: `900px`,
          margin: `0px auto`,
          flex: `1 0 auto`,
          marginBottom: `5rem`,
        }}
      >
        <SignUpForm />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
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
                <div>
                  <p>{node.frontmatter.description}</p>
                </div>
              </header>
            </article>
          )
        })}
      </div>
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
            description
          }
        }
      }
    }
  }
`
