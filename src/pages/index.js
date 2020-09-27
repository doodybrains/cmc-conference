import React, { Component } from "react";
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

class Index extends Component {
  render() {
    const channels = this.props.data.allArenaChannel.edges[0];
    const sections = channels.node.children;

    return (
      <Layout>
        <a href="https://2019.computermouseconference.net/what-is-this-conference">Computer Mouse Conference</h1>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
query {
  allArenaChannel {
    edges {
      node {
        children {
          __typename
          ... on ArenaInnerChannel {
            title
            slug
            metadata {
              description
            }
          }
        }
      }
    }
  }
}
`
export default Index
