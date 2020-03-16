import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          url
        }
        menu(id: "TWVudToy") {
          menuItems {
            nodes {
              id
              url
              label
            }
          }
        }
      }
    }
  `)

  const { title, url } = data.wpgraphql.generalSettings
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  return (
    <>
      <header>
        <Link to="/" className="home">
          {title}
        </Link>
        {items.map(item => (
          <Link to={item.url} key={item.id}>
            {item.label}
          </Link>
        ))}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
