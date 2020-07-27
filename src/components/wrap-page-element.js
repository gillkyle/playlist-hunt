/**
 * ============================================================================
 * Wraps all pages in the layout component so they don't have to rerender
 * ============================================================================
 */

import React from "react"
import Layout from "./layout"

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
