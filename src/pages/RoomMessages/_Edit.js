import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { get } from 'lodash'
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
    const { form, initialValues, message, onCancel, onSubmit, room } = this.props
    const onKeyDown = (event, props) => {
      if (event.keyCode === 27 && get(props, 'input.value') === message.body) {
        history.push(roomPath(room))
      }
    }

    return (
      <MessageForm
        form={form}
        initialValues={initialValues}
        onCancel={onCancel}
        onKeyDown={onKeyDown}
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
    message: message,
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
