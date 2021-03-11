import React from 'react'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { HomeSectionHeader } from 'components/headers/home-header'
import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

const collectionsStyles = css`
  padding: 2rem 0;
  p {
    font-family: 'Graphik Web';
    font-style: normal;
    max-width: 50%;
    font-size: 0.85rem;
  }
  .you {
    font-style: italic;
    font-weight: 600;
  }
  .actions {
    button {
      display: inline-block;
      margin-right: 1rem;
    }
  }
`

export default function MyCollections() {
  return (
    <Layout>
      <SideNav subset="collections" />
      <main className="main">
        <HomeSectionHeader
          sectionTitle="Collections"
          sectionDescription="Share and find collections of content"
        />
        <div className={collectionsStyles}>
          <p>
            We are always exploring new ways to help you discover the best
            content on the web. We have found the best curator for content that
            fascinates you the most...
          </p>
          <p class="you">You.</p>
          <p>
            Would you be interested in sharing your own curated collections to
            help inspire others?
          </p>
          <div className="actions">
            <Button variant="secondary">Absolutely!</Button>
            <Button variant="secondary">Maybe</Button>
            <Button variant="secondary">No thanks</Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
