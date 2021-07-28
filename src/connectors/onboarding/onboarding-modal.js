import { css } from 'linaria'
import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { TopicSelector } from 'connectors/topic-list/topic-selector'
import { onboardingCloseTopicSelectionModal } from './onboarding.state'

const footerStyles = css`
  margin-bottom: 0;
  line-height: 2.5rem;
  margin-right: 1rem;
  font-weight: normal;
  font-size: 1rem;
`

export const OnboardingModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const modalReady = useSelector((state) => state.onboarding.topicSelectionModal)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const handleClose = () => dispatch(onboardingCloseTopicSelectionModal())
  const showModal = modalReady && settingsFetched
  const firstName = useSelector((state) => state.user.first_name)
  const title = firstName ? `Welcome to Pocket, ${firstName}!` : 'Welcome to Pocket!'

  return (
    <Modal
      title={title}
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel={title}
      handleClose={handleClose}>
      <ModalBody>
        <p>Tell us what you're interested in to start curating your personal corner of the web</p>
        <TopicSelector />
      </ModalBody>
      <ModalFooter>
        <p className={footerStyles}>Pick 3 to continue</p>
        <Button
          type="submit"
          data-cy="delete-confirm"
          onClick={handleClose}
          autoFocus={true}>
          <Trans i18nKey="confirm:continue">Continue</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
