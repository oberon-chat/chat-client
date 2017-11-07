import { getRoomsChannel } from '../reducers/rooms'

export const starMessage = (messageId) => ({
  type: 'STAR_MESSAGE',
  messageId: messageId
})

export const unstarMessage = (messageId) => ({
  type: 'UNSTAR_MESSAGE',
  messageId: messageId
})

export const replaceStarMessages = (data) => ({
  type: 'REPLACE_STAR_MESSAGES',
  starredMessages: data
})

export const submitStar = (messageId, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('starred_message:create', messageId)
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const deleteStar = (messageId, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('starred_message:delete', messageId)
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}
