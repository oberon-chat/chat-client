import React from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'

export const Section = ({ children, heading, id, loading, padded, width }) => {
  const spinner = (
    <div className='full-height center-children'>
      <Icon className='section-loading-icon' type='loading' />
    </div>
  )

  return (
    <div
      id={id}
      className='section window-height'
      style={{
        minWidth: width || 'inherit',
        maxWidth: width || 'inherit',
        width: width || '100%'
      }}
    >
      <div className='section-heading'>
        { heading }
      </div>
      <div className={classnames('section-body', 'scroll-container', {'padded': padded})}>
        { loading ? spinner : children }
      </div>
    </div>
  )
}

export const Heading = ({ children }) => (
  <div className='section-heading-content'>
    {children}
  </div>
)

Section.Heading = Heading

export default Section
