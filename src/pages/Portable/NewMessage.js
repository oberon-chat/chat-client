import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { createRoom, joinRooms, joinRoom } from '../../actions/rooms'
import { submitMessage } from '../../actions/roomMessages'
import RoomMessagesForm from '../RoomMessages/_Form'

export const NewMessage = ({ form, onSubmit }) => {
  return (
    <RoomMessagesForm
      form={form}
      onSubmit={onSubmit}
    />
  )
}

NewMessage.displayName = 'PortableNewMessage'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, { form, room }) => ({
  onSubmit: (data) => {
    const onJoinRoom = async () => {
      await dispatch(submitMessage('test', data.message))

      return dispatch(resetForm(form))
    }

    const onJoinRooms = async () => {
      if (!room) { await dispatch(createRoom('test')) }
      
      return dispatch(joinRoom('test', onJoinRoom))
    }

    return dispatch(joinRooms(onJoinRooms))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
