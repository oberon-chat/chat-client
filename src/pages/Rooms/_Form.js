import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset as resetForm } from 'redux-form'
import history from '../../app/history'
import { createRoom } from '../../actions/rooms'
import notification from '../../helpers/notification'
import { Button, Form, Icon, Input } from 'antd'

const RoomInput = (props) => (
  <Input
    placeholder={'Create room'}
    {...props.input}
  />
)

export const CreateRoomForm = ({ handleSubmit, pristine, room, submitting }) => (
  <Form layout='inline' onSubmit={handleSubmit}>
    <Form.Item>
      <Field name='room' component={RoomInput} />
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

CreateRoomForm.displayName = 'CreateRoomForm'

const ReduxForm = reduxForm()(CreateRoomForm)

const mapStateToProps = (state) => ({
  form: 'createRoomForm'
})

const mapDispatchToProps = (dispatch, { room }) => ({
  onSubmit: async (data) => {
    try {
      await dispatch(createRoom(data.room))
      dispatch(resetForm('createRoomForm'))
      history.push('/rooms/' + data.room)
    } catch (_error) {
      notification('Error creating room ' + room, 'error')
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
