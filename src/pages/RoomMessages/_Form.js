import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm, reset as resetForm } from 'redux-form'
import { createMessage } from '../../actions/rooms'
import { Button, Form, Icon, Input } from 'antd'

const MessageInput = (props) => (
  <Input
    placeholder={'Send message to ' + props.room}
    {...props.input}
  />
)

export const MessageForm = ({ handleSubmit, pristine, room, submitting }) => {
  const fieldProps = { room: room }

  return (
    <Form layout='inline' onSubmit={handleSubmit}>
      <Form.Item>
        <Field name='message' component={MessageInput} props={fieldProps} />
      </Form.Item>
      <Button
        type='primary'
        htmlType='submit'
        loading={submitting}
        disabled={pristine || submitting}
      >
        <Icon type='plus' style={{ fontSize: '13px' }} />
      </Button>
    </Form>
  )
}

MessageForm.displayName = 'MessageForm'

MessageForm.propTypes = {
  // Required passed props
  room: PropTypes.string.isRequired,
  // Required generated props
  form: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const ReduxForm = reduxForm()(MessageForm)

const mapStateToProps = (state, { room }) => ({
  form: room + 'MessageForm'
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(createMessage(room, data.message))
    dispatch(resetForm(room + 'MessageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
