import React from 'react'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { submitMessage } from '../../actions/roomMessages'
import MessageForm from './_Form'

export const NewMessage = ({ form, onSubmit, room }) => (
  <MessageForm form={form} onSubmit={onSubmit} room={room} />
)

NewMessage.displayName = 'NewMessage'

const mapStateToProps = (state, { room }) => ({
  form: room + 'NewMessageForm'
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(submitMessage(room, data.message))
    dispatch(resetForm(room + 'NewMessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
