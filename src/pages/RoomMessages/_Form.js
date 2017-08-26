import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
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

const ReduxForm = reduxForm({
  form: 'messageForm'
})(MessageForm)

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: (data) => {
    dispatch(createMessage(room, data.message))
    dispatch(reset('messageForm'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
