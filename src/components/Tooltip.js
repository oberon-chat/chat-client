import React from 'react'
import { connect } from 'react-redux'
import { getClientType } from '../reducers/client'
import { Tooltip as AntTooltip } from 'antd'

const Tooltip = (props) => {
  if (props.clientType === 'portable') {
    return (
      <span title={props.title}>
        {props.children}
      </span>
    )
  }

  return (
    <AntTooltip {...props} />
  )
}

Tooltip.displayName = 'Tooltip'

const mapStateToProps = (state) => ({
  clientType: getClientType(state)
})

export default connect(mapStateToProps)(Tooltip)
