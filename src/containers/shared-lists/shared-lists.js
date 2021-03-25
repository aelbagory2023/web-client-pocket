import React from 'react'
import { useDispatch } from 'react-redux'
import Layout from 'layouts/with-sidebar'
import { SideNav } from 'connectors/side-nav/side-nav'
import { HomeSectionHeader } from 'components/headers/home-header'
import { css } from 'linaria'
import { Button } from '@pocket/web-ui'

import { trackEngagement } from 'connectors/snowplow/snowplow.state'
import { ENGAGEMENT_TYPE_GENERAL } from 'connectors/snowplow/events'
import { UI_COMPONENT_BUTTON } from 'connectors/snowplow/entities'

/* Analytics Event */
export const sendEngagementEvent = (answer) => (trackEngagement(
  ENGAGEMENT_TYPE_GENERAL,
  UI_COMPONENT_BUTTON,
  0, // position in list (zero since it's not in list)
  'shared-lists.survey',
  answer
))

const sharedListStyles = css`
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

export default function SharedLists() {
  const dispatch = useDispatch()

  const onYesClick = () => dispatch(sendEngagementEvent('yes'))
  const onMaybeClick = () => dispatch(sendEngagementEvent('maybe'))
  const onNoClick = () => {
    dispatch(sendEngagementEvent('no'))
  }

  return (
    <Layout>
      <SideNav subset="collections" />
      <main className="main">
        <HomeSectionHeader
          sectionTitle="Shared Lists"
          sectionDescription="Share and find collections of content"
        />
        <div className={sharedListStyles}>
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
            <Button variant="secondary" onClick={onYesClick}>Absolutely!</Button>
            <Button variant="secondary" onClick={onMaybeClick}>Maybe</Button>
            <Button variant="secondary" onClick={onNoClick}>No thanks</Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
