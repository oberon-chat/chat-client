import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { editMessage } from '../../actions/roomMessages'
import { getRoomMessage } from '../../reducers/roomMessages'
import { roomPath } from '../../helpers/paths'
import MessageForm from './_Form'

export class EditMessage extends Component {
  componentDidMount () {
    findDOMNode(this)
      .querySelector('textarea[name="message"]')
      .focus()
  }

  render () {
    const { form, initialValues, onCancel, onSubmit, room } = this.props

    return (
      <MessageForm
        form={form}
        initialValues={initialValues}
        onCancel={onCancel}
        onSubmit={onSubmit}
        room={room}
      />
    )
  }
}

const mapStateToProps = (state, { messageId, room }) => {
  const message = getRoomMessage(state, room, messageId)

  return {
    form: room + 'EditMessageForm',
    initialValues: {message: message.body},
    room: room
  }
}

const mapDispatchToProps = (dispatch, { messageId, room }) => ({
  onCancel: () => {
    history.push(roomPath(room))
  },
  onSubmit: async (data) => {
    await dispatch(editMessage(room, messageId, data.message))
    dispatch(resetForm(room + 'EditMessageForm'))
    history.push(roomPath(room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditMessage)
