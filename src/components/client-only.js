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
