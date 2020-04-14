import React from "react"
import Layout from "../components/layout"
import Playlists from "../components/playlists"

export default () => (
  <Layout
    title="Top Playlists"
    subtitle="The best playlists ranked based on the historical number of upvotes from the community. Updated daily."
  >
    <Playlists playlists={undefined} />
  </Layout>
)
