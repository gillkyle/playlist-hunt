module.exports = {
  plugins: [
    `gatsby-plugin-chakra-ui`,
    `gatsby-plugin-apollo`,
    {
      resolve: `gatsby-plugin-auth0`,
      options: {
        domain: `gillkyle.auth0.com`,
        clientId: `jnp9gQqg31Dcmr2iREXheChlk6g4BaHT`,
      },
    },
    `gatsby-plugin-hasura`,
    `gatsby-plugin-netlify`,
  ],
}
