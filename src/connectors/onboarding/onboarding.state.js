import { SETTINGS_FETCH_SUCCESS } from 'actions'
import { ONBOARDING_RESET } from 'actions'
import { filterSettings } from 'common/utilities'

const initialState = {}

/** ACTIONS
 --------------------------------------------------------------- */

export const resetOnboarding = () => ({ type: ONBOARDING_RESET })

/** REDUCERS
 --------------------------------------------------------------- */

export const onboardingReducers = (state = initialState, action) => {
  switch (action.type) {

    case SETTINGS_FETCH_SUCCESS:
      const { settings } = action
      return {
        ...state,
        ...filterSettings(settings?.onboarding, initialState)
      }
    case ONBOARDING_RESET:
      return initialState

    default:
      return state
  }
}

/** SAGAS :: WATCHERS
 --------------------------------------------------------------- */

export const onboardingSagas = [

]


/** SAGA :: RESPONDERS
 --------------------------------------------------------------- */
