import * as React from "react"

const Card = ({ children }) => (
  <div className="rounded-lg border shadow-sm bg-white p-4">
    {children}
  </div>
)

const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
)

export { Card, CardContent }
