const ApolloBoost = require("apollo-boost")
const ApolloClient = ApolloBoost.default
const fetch = require("isomorphic-fetch")
const gql = require("graphql-tag")

const client = new ApolloClient({
  uri: "https://playlist-hunt.herokuapp.com/v1/graphql",
  fetch,
})

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const { data } = await client.query({
    query: gql`
      query {
        playlist(order_by: { upvotes_aggregate: { count: desc } }) {
          id
          title
          description
          uri
          upvotes_aggregate(order_by: {}) {
            aggregate {
              count(columns: upvoted_at)
            }
          }
        }
      }
    `,
  })

  data.playlist.forEach(playlist =>
    createNode({
      ...playlist,
      id: createNodeId(`Playlist-${playlist.id}`),
      parent: null,
      children: [],
      internal: {
        type: `Playlist`,
        content: JSON.stringify(playlist),
        contentDigest: createContentDigest(playlist),
      },
    })
  )
}
