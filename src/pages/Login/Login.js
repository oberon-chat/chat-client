import React from 'react'
import { connect } from 'react-redux'
import { login as loginCurrentUser } from '../../actions/currentUser'
import { isLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import Page from '../../components/Page'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'

export const Login = ({ location, loggedIn, onLogin }) => {
  if (loggedIn) {
    return <Redirect to={'/'} />
  }

  const onSubmit = async (values) => {
    onLogin(values)
    history.push('/')
  }

  return (
    <Page className='center-children window-height'>
      <div className='padded' style={{ backgroundColor: '#fff' }}>
        <h1>Login</h1>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </Page>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(loginCurrentUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
