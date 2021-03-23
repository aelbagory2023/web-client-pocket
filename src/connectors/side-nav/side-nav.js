import { SideNav as SideNavComponent } from 'components/side-nav/side-nav'
import { featureFlagActive } from 'connectors/feature-flags/feature-flags'
import { useSelector } from 'react-redux'

export function SideNav({ subset, isLoggedIn, tag }) {
  const flagsReady = useSelector((state) => state.features.flagsReady)
  const pinnedTags = useSelector((state) => state.userTags.pinnedTags)
  const appMode = useSelector((state) => state?.app?.mode)
  const featureState = useSelector((state) => state.features)
  const showHome = featureFlagActive({ flag: 'home.new_user', featureState })

  const accountBirth = useSelector((state) => state?.user?.birth)
  const inHomeTest = useSelector((state) => state.features['temp.web.client.home.new_user'])?.assigned //prettier-ignore
  const showHome = isEligible(accountBirth, HOME_TEST_START) && inHomeTest
  const showCollections = useSelector((state) => state.features['temp.web.client.tag.collection.share'])?.assigned //prettier-ignore
  const isDisabled = appMode === 'bulk'
  return (
    <SideNavComponent
      isDisabled={isDisabled}
      subset={subset}
      isLoggedIn={isLoggedIn}
      pinnedTags={pinnedTags}
      tag={tag}
      showHome={showHome}
      showSharedLists={showCollections}
      flagsReady={flagsReady}
    />
  )
}
