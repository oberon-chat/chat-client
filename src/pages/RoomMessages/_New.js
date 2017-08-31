import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { reset as resetForm } from 'redux-form'
import { submitMessage } from '../../actions/roomMessages'
import MessageForm from './_Form'

export class NewMessage extends Component {
  componentDidMount () {
    findDOMNode(this)
      .querySelector('textarea[name="message"]')
      .focus()
  }

  render () {
    const { form, onSubmit, room } = this.props

    return (
      <MessageForm form={form} onSubmit={onSubmit} room={room} />
    )
  }
}

const mapStateToProps = (state, { room }) => ({
  form: room + 'NewMessageForm',
  room: room
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(submitMessage(room, data.message))
    dispatch(resetForm(room + 'NewMessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)
