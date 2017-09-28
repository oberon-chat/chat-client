import { Component } from 'react'

class ErrorHandler extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      timestamp: null
    }
  }

  componentDidCatch (error, _info) {
    this.setState(
      (state) => ({
        ...state,
        hasError: true,
        error: error,
        timestamp: Date.now()
      })
    )
  }

  render () {
    if (this.state.hasError) {
      return null
    } else {
      return this.props.children
    }
  }
}

export default ErrorHandler
