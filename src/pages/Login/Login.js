import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login as loginCurrentUser } from '../../actions/currentUser'
import { fetchSocket } from '../../actions/socket'
import { isLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import ParticleNetwork from '../../lib/particles'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'

class Login extends Component {
  componentDidMount () {
    const container = document.querySelector('#login-background')
    const options = {
      density: 10000,
      velocity: 0.5
    }

    new ParticleNetwork(container, options) // eslint-disable-line
  }

  render () {
    const { loggedIn, onLogin } = this.props

    if (loggedIn) {
      return <Redirect to={'/rooms'} />
    }

    const onSubmit = async (values) => {
      onLogin(values)
      history.push('/rooms')
    }

    return (
      <div id='login-container'>
        <div id='login-background' />
        <div id='login-content' className='center-children'>
          <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    )
  }
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
