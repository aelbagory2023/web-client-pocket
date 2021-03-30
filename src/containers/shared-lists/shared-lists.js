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
export const sendEngagementEvent = (answer) =>
  trackEngagement(
    ENGAGEMENT_TYPE_GENERAL,
    UI_COMPONENT_BUTTON,
    0, // position in list (zero since it's not in list)
    'shared-lists.survey',
    answer
  )

const sharedListStyles = css`
  padding: 2rem 0;
  p {
    font-family: 'Graphik Web';
    font-style: normal;
    max-width: 50%;
    font-size: 0.85rem;
  }
  .responseHeading {
    font-family: 'Graphik Web';
    font-style: italic;
    font-weight: 600;
    font-size: 1rem;
    padding-bottom: 1rem;
  }
  .actions {
    button,
    a {
      display: inline-block;
      margin-right: 1rem;
    }
  }
`

export default function SharedLists() {
  const dispatch = useDispatch()
  const [answered, setAnswer] = useState('pending')

  const onYesClick = () => {
    setAnswer('yes')
    dispatch(sendEngagementEvent('yes'))
  }

  const onNoClick = () => {
    setAnswer('no')
    dispatch(sendEngagementEvent('no'))
  }

  const onSurveyClick = () => {
    //open survey
  }

  const pending = answered === 'pending'

  return (
    <Layout>
      <SideNav subset="collections" />
      <main className="main">
        <HomeSectionHeader
          sectionTitle="Share your lists"
          sectionDescription="Share collections of content"
        />
        <div className={sharedListStyles}>
          <p>
            Hello! We're thinking about offering people new ways to create and share lists of things
            they've saved to Pocket.
          </p>

          <p>
            Our first step is to get a sense of whether people might be interested in this feature
            and why. Is this something that would interest you?
          </p>

          {pending ? (
            <div className="actions">
              <Button variant="secondary" target="_survey" onClick={onYesClick}>
                Yes
              </Button>

              <Button variant="secondary" onClick={onNoClick}>
                No
              </Button>
            </div>
          ) : null}

          {answered === 'no' ? <p>Thanks for your feedback!</p> : null}

          {answered === 'yes' ? (
            <>
              <div className="responseHeading">Awesome!</div>
              <p>
                We would love to hear more from you. If you have the time, please share your
                thoughts in this survey. Thank you!
              </p>
              <div className="actions">
                <Button
                  variant="secondary"
                  href="https://survey.alchemer.com/s3/6158777/Pocket-Shareable-Collections-2021"
                  target="_survey"
                  onClick={onSurveyClick}>
                  Take a quick survey
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}
