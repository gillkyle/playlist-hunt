import React from "react"
import Layout from "../components/layout"
import Playlists from "../components/playlists"

export default () => (
  <Layout
    title="Newest Playlists"
    subtitle="The latest playlists from the community, coming in live."
  >
    <Playlists playlists={undefined} />
  </Layout>
)
