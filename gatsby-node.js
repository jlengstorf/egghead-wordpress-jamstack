exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      wpgraphql {
        pages {
          nodes {
            id
            uri
          }
        }
        posts {
          nodes {
            id
            uri
          }
        }
      }
    }
  `)

  const pages = result.data.wpgraphql.pages.nodes

  pages.forEach(page => {
    actions.createPage({
      path: page.uri,
      component: require.resolve("./src/templates/page-template.js"),
      context: {
        id: page.id,
      },
    })
  })

  const posts = result.data.wpgraphql.posts.nodes

  posts.forEach(post => {
    actions.createPage({
      path: `blog/${post.uri}`,
      component: require.resolve("./src/templates/post-template.js"),
      context: {
        id: post.id,
      },
    })
  })
}
