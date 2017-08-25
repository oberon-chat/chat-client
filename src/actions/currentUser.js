import { clearCache } from '../helpers/cache'
import { deleteToken, updateToken } from '../helpers/token'

export const login = (values) => {
  updateToken(values.token)

  return {
    type: 'CURRENT_USER_LOGIN',
    values
  }
}

export const logout = () => {
  deleteToken()
  clearCache()

  return {
    type: 'CURRENT_USER_LOGOUT'
  }
}

export const updatePreferences = (values) => ({
  type: 'CURRENT_USER_UPDATE_PREFERENCES',
  values
})
