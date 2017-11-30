import { reverse } from 'lodash'
import { getRoomChannel, getRoomsChannel } from '../reducers/rooms'
import { joinChannel, leaveChannel } from './channels'
import { addPublicRoom, replacePublicRooms } from './publicRooms'
import { addMessage, removeMessage, replaceMessage, replaceMessages } from './roomMessages'
import { addRoomSubscription, removeRoomSubscription, replaceRoomSubscription, replaceRoomSubscriptions } from './roomSubscriptions'
import { replaceStarMessages, starMessage, unstarMessage } from './starMessage'
import { camelize, listToObject } from '../helpers/data'

export const archiveRoom = (slug, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)
  return channel
    .push('room:archive')
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const createRoom = (name, type, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('rooms:create', {name: name, type: type})
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}

export const viewRoom = (slug) => ({
  type: 'VIEW_ROOM',
  room: slug
})

export const joinRoomsChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'rooms'
  const channelCallbacks = (channel) => {
    channel.on('rooms:public', (data) => {
      dispatch(replacePublicRooms(data.rooms))
    })

    channel.on('rooms:public:created', (data) => {
      dispatch(addPublicRoom(data))
    })

    channel.on('starred_messages', (data) => {
      const cased = camelize(data['starred_messages'])
      const asObject = listToObject(cased, 'messageId')

      dispatch(replaceStarMessages(asObject))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}

export const joinRoomChannel = (slug, onSuccess, onError) => (dispatch, getState) => {
  const key = 'room:' + slug
  const channelCallbacks = (channel) => {
    channel.on('room:subscriptions', (data) => {
      dispatch(replaceRoomSubscriptions(slug, camelize(data.subscriptions)))
    })

    channel.on('room:subscription:created', (data) => {
      dispatch(addRoomSubscription(slug, camelize(data)))
    })

    channel.on('room:subscription:updated', (data) => {
      dispatch(replaceRoomSubscription(slug, camelize(data)))
    })

    channel.on('room:subscription:deleted', (data) => {
      dispatch(removeRoomSubscription(slug, camelize(data)))
    })

    channel.on('messages', (data) => {
      const messages = camelize(reverse((data || {}).messages))

      dispatch(replaceMessages(slug, messages))
    })

    channel.on('message:created', (data) => (
      dispatch(addMessage(slug, camelize(data)))
    ))

    channel.on('message:updated', (data) => (
      dispatch(replaceMessage(slug, camelize(data)))
    ))

    channel.on('message:deleted', (data) => (
      dispatch(removeMessage(slug, camelize(data)))
    ))

    channel.on('starred_message:created', (data) => (
      dispatch(starMessage(camelize(data, {})))
    ))

    channel.on('starred_message:deleted', (data) => (
      dispatch(unstarMessage(camelize(data, {})))
    ))

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}

export const leaveRoomChannel = (slug) => (dispatch) => {
  const key = 'room:' + slug

  return dispatch(leaveChannel(key))
}

export const reactivateRoom = (slug, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomChannel(getState(), slug)
  return channel
    .push('room:reactivate')
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}
