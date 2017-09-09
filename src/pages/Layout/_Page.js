import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSocket } from '../../actions/socket'
import { isLoggedIn } from '../../reducers/currentUser'
import { Layout } from 'antd'

class Page extends Component {
  componentWillMount () {
    if (this.props.loggedIn) {
      this.props.withLogin()
    }
  }

  render () {
    const { children } = this.props

    return (
      <Layout className='ant-layout window-height window-width'>
        { children }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  withLogin: () => dispatch(fetchSocket())
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
