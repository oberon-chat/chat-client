import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { setActiveRoom } from '../../actions/portable'
import { createRoom, joinRooms, joinRoom } from '../../actions/rooms'
import { submitMessage } from '../../actions/roomMessages'
import { shortUuid } from '../../helpers/uuid'
import RoomMessagesForm from '../RoomMessages/_Form'

export const MessageForm = ({ form, onSubmit }) => {
  return (
    <RoomMessagesForm
      form={form}
      onSubmit={onSubmit}
    />
  )
}

MessageForm.displayName = 'PortableMessageForm'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, { form, activeRoom }) => ({
  onSubmit: (data) => {
    const room = activeRoom || 'user-' + shortUuid()
    const onJoinRoom = async () => {
      dispatch(setActiveRoom(room))
      await dispatch(submitMessage(room, data.message))

      return dispatch(resetForm(form))
    }

    const onJoinRooms = async () => {
      if (!activeRoom) { await dispatch(createRoom(room)) }

      return dispatch(joinRoom(room, onJoinRoom))
    }

    return dispatch(joinRooms(onJoinRooms))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
