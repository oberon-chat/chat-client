import { every, filter, find, isEmpty, map, reject } from 'lodash'

const initialState = []

export const userSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_SUBSCRIPTION':
      return state.concat(action.subscription)
    case 'REPLACE_USER_SUBSCRIPTION':
      return map(state, (subscription) => (
        subscription.id === action.subscription.id ? action.subscription : subscription
      ))
    case 'REMOVE_USER_SUBSCRIPTION':
      return reject(state, (subscription) => subscription.id === action.subscription.id)
    case 'REPLACE_USER_SUBSCRIPTIONS':
      return action.subscriptions
    default:
      return state
  }
}

export const getSubscriptions = (state) => state.userSubscriptions || []
export const getSubscription = (state, slug) => find(getSubscriptions(state), (subscription) => subscription.room.slug === slug) || {}
export const getIsSubscribed = (state, slug) => !isEmpty(getSubscription(state, slug))
export const getSubscribedRooms = (state) => map(getSubscriptions(state), (subscription) => subscription.room)
export const getSubscribedRoom = (state, slug) => find(getSubscribedRooms(state), (room) => room.slug === slug) || {}
export const getSubscribedRoomsBy = (state, values) => filter(getSubscribedRooms(state), (room) => every(values, (value, key) => room[key] === value))
export const getViewedAt = (state, slug) => getSubscription(state, slug).viewedAt

export default userSubscriptionsReducer
