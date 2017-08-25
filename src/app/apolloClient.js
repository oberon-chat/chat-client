import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { getToken } from '../helpers/token'

const networkInterface = createNetworkInterface({
  uri: 'http://' + process.env.CHAT_SERVER_DOMAIN
})

const requestHeaders = {
  applyMiddleware (req, next) {
    const token = getToken()

    if (!req.options.headers) { req.options.headers = {} }
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}

networkInterface.use([requestHeaders])

const apolloClient = new ApolloClient({
  networkInterface
})

export default apolloClient
