/**
 * ============================================================================
 * This component is useful for avoiding issues with rehydration, see Josh
 * Comeau's fantastic post to see why: https://joshwcomeau.com/react/the-perils-of-rehydration/
 * ============================================================================
 */

import React, { useEffect } from "react"

const ClientOnly = ({ children, ...props }) => {
  const [hasMounted, setHasMounted] = React.useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...props}>{children}</div>
}

export default ClientOnly
