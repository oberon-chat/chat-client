import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { get, isEmpty } from 'lodash'
import history from '../../app/history'
import { submitMessage } from '../../actions/roomMessages'
import { getCurrentUser } from '../../reducers/currentUser'
import { getLastRoomMessage } from '../../reducers/roomMessages'
import { editMessagePath } from '../../helpers/paths'
import MessageForm from './_Form'

export class NewMessage extends Component {
  componentDidMount () {
    findDOMNode(this)
      .querySelector('textarea[name="message"]')
      .focus()
  }

  render () {
    const { form, onKeyDown, onSubmit, room } = this.props

    return (
      <MessageForm
        form={form}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        room={room}
      />
    )
  }
}

const mapStateToProps = (state, { room }) => ({
  form: room + 'NewMessageForm',
  room: room,
  onKeyDown: (event, props) => {
    if (event.keyCode === 38 && !get(props, 'input.value')) {
      const currentUser = getCurrentUser(state)
      const message = getLastRoomMessage(state, room, currentUser.username)

      if (!isEmpty(message)) {
        history.push(editMessagePath(room, message.id))
      }
    }
  }
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(submitMessage(room, data.message))
    dispatch(resetForm(room + 'NewMessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
