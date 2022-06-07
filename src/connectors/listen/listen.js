import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAudioFile } from 'connectors/listen/listen.state'
import { Audio } from 'components/audio/audio'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const Listen = ({ itemId }) => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.user?.auth)
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const featureState = useSelector((state) => state.features)
  const isLab = flagsReady && featureFlagActive({ flag: 'lab', featureState })
  const file = useSelector((state) => state.listen[itemId])

  useEffect(() => {
    if (isLab && isAuthenticated && itemId) dispatch(getAudioFile(itemId))
  }, [dispatch, isLab, isAuthenticated, itemId ])

  if (!file) return null

  const { status, url } = file
  const available = status === 'available'

  // Snowplow Events
  const playEvent = () => console.log('onPlay')
  const pauseEvent = () => console.log('onPause')
  const rateChangeEvent = (rate) => console.log('onRateChange', rate)
  const endEvent = () => console.log('onEnded')

  return (url && available) ? (
    <Audio
      url={url}
      playEvent={playEvent}
      pauseEvent={pauseEvent}
      rateChangeEvent={rateChangeEvent}
      endEvent={endEvent}
    />
  ) : null
}
