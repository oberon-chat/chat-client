export const getToken = (value) => (
  window.localStorage.getItem('token')
)

export const updateToken = (value) => (
  window.localStorage.setItem('token', value)
)

export const deleteToken = () => (
  window.localStorage.removeItem('token')
)
