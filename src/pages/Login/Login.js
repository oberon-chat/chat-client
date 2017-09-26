import React from 'react'
import { connect } from 'react-redux'
import { login as loginCurrentUser } from '../../actions/currentUser'
import { fetchSocket } from '../../actions/socket'
import { isLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import Particles from '../../components/Particles'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'

const Login = ({ loggedIn, onLogin }) => {
  if (loggedIn) {
    return <Redirect to={'/rooms'} />
  }

  const onSubmit = async (values) => {
    onLogin(values)
    history.push('/rooms')
  }

  return (
    <div id='login-container'>
      <Particles id='login-background' />
      <div id='login-content' className='center-children'>
        <div>
          <h1>Login</h1>
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => {
    dispatch(loginCurrentUser(data))
    dispatch(fetchSocket())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
