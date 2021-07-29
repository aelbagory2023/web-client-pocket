import React from 'react'
import { css } from 'linaria'
import { HomeJourneyHeader } from 'components/headers/home-header'
import { useSelector } from 'react-redux'
import { TopicSelector } from 'connectors/topic-list/topic-selector'
import { breakpointLargeHandset } from '@pocket/web-ui'

const selectionStyles = css`
  padding: 2rem 0;
`

export const pillboxStyle = css`
  padding: 0 3rem 1.5rem;

  ${breakpointLargeHandset} {
    padding: 0 0 1.5rem;
  }
`

export const HomeTopicSelector = () => {
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)

  const journeyTitles = ['Start your Pocket journey', 'Discover more topics']

  const journeySubTitles = [
    'Select a topic to find fascinating stories from all across the web',
    'Save today’s essential reads and find them later in My List'
  ]

  const journeyTitle = journeyTitles[Math.min(pinnedTopics?.length, Math.max(0, 1))]

  const journeySubTitle = journeySubTitles[Math.min(pinnedTopics?.length, Math.max(0, 1))]

  return (
    <div className={selectionStyles}>
      <HomeJourneyHeader sectionTitle={journeyTitle} sectionDescription={journeySubTitle} />
      <div className={pillboxStyle}>
        <TopicSelector />
      </div>
    </div>
  )
}
