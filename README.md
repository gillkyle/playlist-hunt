<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Playlist Hunt" src="https://raw.githubusercontent.com/gillkyle/images/master/playlist-hunt/logo-large.png" width="300" />
  </a>
</p>
<p align="center">
  <b>An example full-stack Gatsby app built with open source technologies.</b>
</p>

## Overview

PlaylistHunt is a simplified version/clone of ProductHunt. It has the following features:

- Authentication with login and signup
- Authorization and role based access
- Submission of new playlists by logged in users
- Upvoting by logged in users

## Architecture

The site is intended to help exemplify the hybrid nature of web apps—static and dynamic. There are two main pages that fetch a list of playlists: 

1. New
1. Top

### New Playlists (Dynamic)

A commonly understood pattern of web apps is fetching data from a server at runtime. The `/` (homepage) route fetches data in the browser and shows a loading state while the data is coming from the backend.

It uses a GraphQL query like this:

```
query PlaylistsQuery {
  playlist(order_by: { created_at: desc }) {
    id
    title
    ...
  }
}
```

### Top Playlists (Static)

A powerful pattern is preparing the data a site will need before hand. Rather than fetching it right when it's asked for by a user's browser, the data can be rendered no the server at buildtime. The `/top` route fetches data at build time and through Gatsby makes the data queryable at buildtime.

It uses a GraphQL that looks very similar:

```
query TopPlaylistsQuery {
  allPlaylist(
    sort: { fields: upvote_count, order: DESC }
    limit: 10
  ) {
    nodes {
      id
      title
      ...
    }
  }
}
```

## Technologies Used

This project relies on several open source libraries and services:

- [Gatsby](https://gatsbyjs.org/)
- [Auth0](https://auth0.com/)
- [Hasura](https://hasura.io/)
- [Apollo Client](https://www.apollographql.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Formik](https://jaredpalmer.com/formik/)

<h2 align="center">
  ▲PlaylistHunt
</h2>

