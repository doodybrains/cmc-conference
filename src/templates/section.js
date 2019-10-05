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
        <h3>{metadata.description}</h3>

        <div className="grid">
          {children
            .filter(item => item.__typename === 'ArenaBlock')
            .map((item, index) => {
              console.log(item);
              if (item.image) {
                if (item.title === "sub.jpg") {
                  return (
                    <div className="image large" key={index}>
                      <Img
                        fluid={item.image.childImageSharp.fluid}
                      />
                    </div>
                  )
                } else {
                  return (
                    <div className="image" key={index}>
                      <Img
                        fluid={item.image.childImageSharp.fluid}
                      />
                    </div>
                  )
                }

              } else if (item.content_html) {
                let itemTitle;
                let itemLink;
                if (item.title) itemTitle = item.title;
                if (item.description) itemLink = item.description;
                console.log(item);
                return (
                  <div className="text" key={index}>
                    {itemLink &&
                      <a href={itemLink} target="_blank"><h4>{itemTitle}</h4></a>
                    }
                    {!itemLink &&
                      <h4>{itemTitle}</h4>
                    }

                    <div
                      dangerouslySetInnerHTML={{ __html: item.content_html }}
                    />
                  </div>
                )
              } else {
                return null;
              }
            })}
        </div>
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
          description
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
