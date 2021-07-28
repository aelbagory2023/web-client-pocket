import { Button } from '@pocket/web-ui'
import { Modal, ModalBody, ModalFooter } from 'components/modal/modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, Trans } from 'next-i18next'
import { TopicSelector } from 'containers/home/topicSelector'
import { onboardingCloseTopicSelectionModal } from './onboarding.state'


export const OnboardingModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const appRootSelector = '#__next'
  const modalReady = useSelector((state) => state.onboarding.topicSelectionModal)
  const settingsFetched = useSelector((state) => state.settings.settingsFetched)
  const handleClose = () => dispatch(onboardingCloseTopicSelectionModal())
  const showModal = modalReady && settingsFetched

  return (
    <Modal
      title="boop title"
      appRootSelector={appRootSelector}
      isOpen={showModal}
      screenReaderLabel="boop"
      handleClose={handleClose}>
      <ModalBody>
        <TopicSelector />
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          data-cy="delete-confirm"
          onClick={handleClose}
          autoFocus={true}>
          <Trans i18nKey="confirm:close">Close</Trans>
        </Button>
      </ModalFooter>
    </Modal>
  )
}
