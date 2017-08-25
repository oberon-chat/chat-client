import React from 'react'
import { connect } from 'react-redux'
import { login as loginCurrentUser } from '../../actions/currentUser'
import { fetchSocket } from '../../actions/socket'
import { isLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'

export const Login = ({ location, loggedIn, onLogin }) => {
  if (loggedIn) {
    return <Redirect to={'/rooms'} />
  }

  const onSubmit = async (values) => {
    onLogin(values)
    await fetchSocket()
    history.push('/rooms')
  }

  return (
    <div className='center-children'>
      <div className='padded' style={{ backgroundColor: '#fff' }}>
        <h1>Login</h1>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(loginCurrentUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
