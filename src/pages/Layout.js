import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { isLoggedIn } from '../reducers/currentUser'
import { Layout as LayoutComponent } from 'antd'
import Header from './Layout/_Header'
import DraggableBanner from './Layout/_DraggableBanner'
import FlashMessages from '../components/FlashMessages'
import './Layout.css'

import Login from './Login'

export const Layout = ({ loggedIn }) => {
  const loggedInRoutes = (
    <Switch />
  )

  const loggedOutRoutes = (
    <Switch>
      <Route component={Login} />
    </Switch>
  )

  return (
    <LayoutComponent className='ant-layout-has-sider window-height'>
      <DraggableBanner />
      <FlashMessages />
      <Header />
      { loggedIn ? loggedInRoutes : loggedOutRoutes }
    </LayoutComponent>
  )
}

Layout.displayName = 'Layout'

const mapStateToProps = (state) => ({
  loggedIn: isLoggedIn(state)
})

export default withRouter(connect(mapStateToProps)(Layout))
