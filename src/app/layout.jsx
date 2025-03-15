import React from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'Tablature',
  description: 'Save your compositions in a Guitar Tablature'
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
