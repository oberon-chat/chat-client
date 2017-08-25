import React from 'react'
import { Layout } from 'antd'
import UserDropdown from '../User/_Dropdown'

export const Header = () => {
  return (
    <Layout.Header id='header'>
      <div id='logo'>
        Chat
      </div>
      <div className='header-actions'>
        <UserDropdown />
      </div>
    </Layout.Header>
  )
}

Header.displayName = 'LayoutHeader'

export default Header
