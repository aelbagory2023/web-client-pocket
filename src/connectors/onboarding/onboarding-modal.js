import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { TopicSelector } from 'connectors/topic-list/topic-selector'
import { onboardingCloseTopicSelectionModal } from './onboarding.state'
import { sendSnowplowEvent } from 'connectors/snowplow/snowplow.state'

export const OnboardingModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const pinnedTopics = useSelector((state) => state.settings.pinnedTopics)
  const modalReady = useSelector((state) => state.onboarding.topicSelectionModal)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const showModal = modalReady && settingsFetched

  useEffect(() => {
    if (showModal) dispatch(sendSnowplowEvent('onboarding.welcome.impression'))
  }, [showModal])

  const handleClose = () => {
    dispatch(sendSnowplowEvent('onboarding.welcome.close'))
    dispatch(onboardingCloseTopicSelectionModal())
  }

  const handleContinue = () => {
    dispatch(sendSnowplowEvent('onboarding.welcome.continue'))
    dispatch(onboardingCloseTopicSelectionModal())
  }

  const toggleCallback = (label) => {
    dispatch(sendSnowplowEvent('onboarding.topic.toggle', { label }))
  }

  const buttonLabel = pinnedTopics.length === 0
    ? t('confirm:skip', 'Skip')
    : t('confirm:continue', 'Continue')

  return (
    <Modal
      appRootSelector={appRootSelector}
      isOpen={showModal}
      // screenReaderLabel={}
      shouldCloseOnOverlayClick={false}
      handleClose={handleClose}>
      <ModalBody>
        <p>Tell us what you're interested in to start curating your personal corner of the web</p>
        <TopicSelector toggleCallback={toggleCallback} />
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          data-cy="onboarding-cta"
          onClick={handleContinue}>
          { buttonLabel }
        </Button>
      </ModalFooter>
    </Modal>
  )
}
