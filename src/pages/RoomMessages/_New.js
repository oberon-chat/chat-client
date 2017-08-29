import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { submitMessage } from '../../actions/roomMessages'
import MessageForm from './_Form'

export const NewMessage = ({ form, onSubmit, room }) => (
  <MessageForm form={form} onSubmit={onSubmit} room={room} />
)

NewMessage.displayName = 'NewMessage'

const mapStateToProps = (state, { match }) => ({
  form: match.params.room + 'NewMessageForm',
  room: match.params.room
})

const mapDispatchToProps = (dispatch, { match }) => ({
  onSubmit: (data) => {
    dispatch(submitMessage(match.params.room, data.message))
    dispatch(resetForm(match.params.room + 'NewMessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
