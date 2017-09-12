import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Icon, Input } from 'antd'

const MessageInput = (props) => {
  const maxRows = 4
  const lines = props.input.value.split('\n').length
  const rows = lines > maxRows ? maxRows : lines

  return (
    <Input.TextArea
      placeholder={'Send message ' + props.room || ''}
      onKeyDown={(event) => props.handleKeyDown(event, props)}
      rows={rows}
      {...props.input}
    />
  )
}

const CancelButton = ({ disabled, onCancel }) => {
  if (!onCancel) {
    return null
  }

  return (
    <Button
      disabled={disabled}
      onClick={onCancel}
    >
      Cancel
    </Button>
  )
}

export const MessageForm = ({ handleSubmit, onCancel, onKeyDown, pristine, room, submitting }) => {
  const handleKeyDown = (event, props) => {
    if (onKeyDown) {
      onKeyDown(event, props)
    }

    if (event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit()
      event.preventDefault()
    }
  }

  const fieldProps = { handleKeyDown: handleKeyDown, room: room }

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
      <CancelButton
        onCancel={onCancel}
        disabled={submitting}
      />
    </Form>
  )
}

MessageForm.displayName = 'MessageForm'

MessageForm.propTypes = {
  form: PropTypes.string.isRequired, // Redux Form id
  onSubmit: PropTypes.func.isRequired,
  room: PropTypes.string
}

export default reduxForm({ enableReinitialize: true })(MessageForm)
