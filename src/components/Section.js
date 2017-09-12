import React from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'

export const Section = ({ children, classes, footer, header, id, loading, padded, width }) => {
  const spinner = (
    <div className='full-height center-children'>
      <Icon className='section-loading-icon' type='loading' />
    </div>
  )

  return (
    <div
      id={id}
      className={'section window-height ' + classes}
      style={{
        minWidth: width || 'inherit',
        maxWidth: width || 'inherit',
        width: width || '100%'
      }}
    >
      { header &&
        <div className='section-header'>
          { header }
        </div>
      }
      <div className={classnames('section-body', 'scroll-container', {'padded': padded})}>
        { loading ? spinner : children }
      </div>
      { footer &&
        <div className='section-footer'>
          { footer }
        </div>
      }
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
