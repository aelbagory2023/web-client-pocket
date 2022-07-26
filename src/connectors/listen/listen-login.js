import { css } from 'linaria'
import { useDispatch, useSelector } from 'react-redux'
import { Listen } from 'connectors/listen/listen'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { SIGNUP_URL } from 'common/constants'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'
import { ListenIcon } from 'components/icons/ListenIcon'

const loggedOutStyle = css`
  color: var(--color-textSecondary);
  font-family: var(--fontSansSerif);
  font-weight: 300;
  font-size: 1.25em;
  line-height: 140%;
`

export const ListenLogin = ({ itemId, path }) => {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.user_status)
  const featureState = useSelector((state) => state.features)
  const listenLab = featureFlagActive({ flag: 'lab.listen', featureState })

  const signUpEvent = () => dispatch(sendSnowplowEvent('listen.signup'))

  const loggedIn = userStatus === 'valids'

  return listenLab ? (
    loggedIn ? <Listen itemId={itemId} path={path} /> : <LoggedOut path={path} clickEvent={signUpEvent} />
  ) : null
}

const LoggedOut = ({ clickEvent, path = '' }) => (
  <p className={loggedOutStyle}>
    <ListenIcon /> Want to listen to this article?{' '}
    <a href={`${SIGNUP_URL}?route=${path}`} onClick={clickEvent}>Sign up</a> to check it out!
  </p>
)
