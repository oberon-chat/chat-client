import apolloClient from '../app/apolloClient'

export const clearCache = () => apolloClient.resetStore()

export default clearCache
