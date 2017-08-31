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

const mapStateToProps = (state, { match }) => {
  const message = getRoomMessage(state, match.params.room, match.params.message)

  return {
    form: match.params.room + 'EditMessageForm',
    initialValues: {message: message.body},
    room: match.params.room
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  onCancel: () => {
    history.push(roomPath(match.params.room))
  },
  onSubmit: async (data) => {
    await dispatch(editMessage(match.params.room, match.params.message, data.message))
    dispatch(resetForm(match.params.room + 'EditMessageForm'))
    history.push(roomPath(match.params.room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditMessage)
