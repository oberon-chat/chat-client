import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Icon } from 'antd'

export const ButtonLink = ({ children, icon, size, to }) => {
  const classes = classnames(
    'ant-btn',
    {'ant-btn-icon-only': !isEmpty(icon) && isEmpty(children)}
  )

  return (
    <Link to={to} className={classes} style={{ fontSize: size || 'inherit' }}>
      { icon && <Icon type={icon} /> }
      { children }
    </Link>
  )
}

ButtonLink.displayName = 'ButtonLink'

export default ButtonLink
