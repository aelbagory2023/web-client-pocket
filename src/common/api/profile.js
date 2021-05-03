import { request } from 'common/utilities/request/request'

// https://github.com/Pocket/spec/blob/v3/browse/docs/getProfile.md
export const getUserProfile = (profile) => {
  return request({
    path: 'v3/getProfile',
    params: {
      version: 2,
      profile_key: profile
    },
    auth: true
  })
}
