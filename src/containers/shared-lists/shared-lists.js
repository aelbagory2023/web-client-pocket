import React, { useState } from 'react'
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
    button, a {
      display: inline-block;
      margin-right: 1rem;
    }
  }
`

export default function SharedLists() {
  const dispatch = useDispatch()
  const [answered, setAnswer] = useState(false)

  const onYesClick = () => dispatch(sendEngagementEvent('yes'))
  const onMaybeClick = () => dispatch(sendEngagementEvent('maybe'))
  const onNoClick = () => {
    setAnswer(true)
    dispatch(sendEngagementEvent('no'))
  }

  return (
    <Layout>
      <SideNav subset="collections" />
      <main className="main">
        <HomeSectionHeader
          sectionTitle="Share your lists"
          sectionDescription="Share collections of content"
        />
        <div className={sharedListStyles}>
          { answered ? (
            <p>Thanks for your feedback!</p>
          ) : (
            <>
              <p>
                Hello! We’re thinking about offering people new ways to share lists
                of things they've saved to Pocket.
              </p>

              <p>
                Our first step is to get a sense of whether people might be interested
                in this feature and why. If you could take a second and select your
                interest below, that would be incredibly helpful. Thank you!
              </p>

              <p>
                Would you be interested in sharing a list of articles with others?
              </p>

              <div className="actions">
                <Button
                  variant="secondary"
                  href="https://survey.alchemer.com/s3/6158777/Pocket-Shareable-Collections-2021"
                  target="_survey"
                  onClick={onYesClick}>
                  Yes
                </Button>

                <Button
                  variant="secondary"
                  href="https://survey.alchemer.com/s3/6158777/Pocket-Shareable-Collections-2021"
                  target="_survey"
                  onClick={onMaybeClick}>
                  Maybe
                </Button>

                <Button
                  variant="secondary"
                  onClick={onNoClick}>
                  No
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  )
}
