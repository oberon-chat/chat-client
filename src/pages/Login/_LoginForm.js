import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Icon, Input } from 'antd'

const UsernameInput = (props) => (
  <Input
    prefix={<Icon type='user' style={{ fontSize: '13px' }} />}
    placeholder='Username'
    {...props.input}
  />
)

export const NotesForm = ({handleSubmit, pristine, submitting}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Item>
      <label htmlFor='username'>Username</label>
      <Field name='username' component={UsernameInput} />
    </Form.Item>
    <Button
      type='primary'
      htmlType='submit'
      loading={submitting}
      disabled={pristine || submitting}
    >
      Login
    </Button>
  </Form>
)

const ReduxForm = reduxForm({
  form: 'loginForm'
})(NotesForm)

export default ReduxForm
