exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const sectionTemplate = require.resolve(`./src/templates/section.js`)

  return graphql(`
    {
      allArenaChannel {
        edges {
          node {
            children {
              __typename
              ... on ArenaInnerChannel {
                slug
              }
            }
          }
        }
      }
    }
  `).then(result => {
    // Create all the pages
    result.data.allArenaChannel.edges.forEach(edge => {
      edge.node.children
        .filter(item => item.__typename === 'ArenaInnerChannel')
        .forEach(child => {
          createPage({
            path: `${child.slug}`,
            component: sectionTemplate,
            context: {
              slug: child.slug,
            },
          })
        })
    })
  })
}
