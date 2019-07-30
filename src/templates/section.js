import React, { Component } from "react";
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

class SectionTemplate extends Component {
  render() {
    const {
      title,
      metadata: { description },
      children,
    } = this.props.data.arenaInnerChannel

    return (
      <Layout>
      <h2>{title}</h2>
      {children
        .filter(item => item.__typename === 'ArenaBlock')
        .map((item, index) => {
          if (item.image) {
            return (
              <div key={index} style={{padding: '0 30%', marginBottom: '20px'}}>
                <Img
                  fluid={item.image.childImageSharp.fluid}
                />
              </div>
            )
          } else if (item.content_html) {
            return (
              <div
                style={{padding: '0 30%', textAlign: 'center', marginBottom: '20px'}}
                key={index}
                dangerouslySetInnerHTML={{ __html: item.content_html }}
              />
            )
          } else {
            return (
              <h1 key={index}>content text</h1>
            )
          }
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    arenaInnerChannel(slug: { eq: $slug }) {
      title
      metadata {
        description
      }
      children {
        __typename
        ... on ArenaBlock {
          content_html
          image {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`
export default SectionTemplate
