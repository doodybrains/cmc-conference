import React, { Component } from "react";
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

class SectionTemplate extends Component {
  render() {
    const {
      title,
      metadata,
      children,
    } = this.props.data.arenaInnerChannel
    console.log(metadata);
    return (
      <Layout>
        <h2 style={{marginBottom: '40px'}}>{title}</h2>
        <h3 style={{marginBottom: '40px', color: 'white', fontSize: '2.25em'}}>{metadata.description}</h3>
        {children
          .filter(item => item.__typename === 'ArenaBlock')
          .map((item, index) => {
            console.log(item);
            if (item.image) {
              return (
                <div key={index} style={{padding: '0 20%', margin: '30px auto 30px auto'}}>
                  <Img
                    fluid={item.image.childImageSharp.fluid}
                  />
                </div>
              )
            } else if (item.content_html) {
              let itemTitle;
              if (item.title) itemTitle = item.title;
              return (
                <div key={index}>
                  <h4 style={{padding: '0 2%', color: 'white', textAlign: 'center', marginBottom: '20px', fontSize: '1.75em'}}>{itemTitle}</h4>
                  <div
                    style={{padding: '0 2%', color: 'white', textAlign: 'center', marginBottom: '20px', fontSize: '1.25em'}}
                    dangerouslySetInnerHTML={{ __html: item.content_html }}
                  />
                </div>
              )
            } else {
              return null;
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
          title
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
