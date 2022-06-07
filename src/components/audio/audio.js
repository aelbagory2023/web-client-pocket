import { useRef, useState } from 'react'
import { css } from 'linaria'
import { LISTEN_SPEEDS } from 'common/constants'

const audioStyles = css`
  display: flex;
  margin-bottom: 1rem;

  audio {
    display: inline-block;
    width: 100%;
    border-radius: 20px;
  }

  select {
    cursor: pointer;
    margin-left: 1rem;
    width: 80px;
    min-width: 80px;
    height: 2.5rem;
    display: inline-block;
  }
`

export const Audio = ({
  url,
  playEvent,
  pauseEvent,
  rateChangeEvent,
  endEvent,
}) => {
  const ref = useRef()
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const onPlay = () => playEvent()
  const onPause = () => pauseEvent()
  const onRateChange = (e) => rateChangeEvent(e.target.playbackRate)
  const onEnded = () => endEvent()

  const updatePlayback = (e) => {
    setPlaybackSpeed(e.target.value)
    ref.current.playbackRate = e.target.value
  }

  return (
    <div className={audioStyles}>
      <audio
        ref={ref}
        src={url}
        onPlay={onPlay}
        onPause={onPause}
        onRateChange={onRateChange}
        onEnded={onEnded}
        controls
      />
      <select value={playbackSpeed} onChange={updatePlayback}>
        {LISTEN_SPEEDS.map(val => (
          <option value={val} key={val}>{val}x</option>
        ))}
      </select>
    </div>
  )
}

Audio.defaultProps = {
  url: null,
  playEvent: () => { },
  pauseEvent: () => { },
  rateChangeEvent: () => { },
  endEvent: () => { }
}
