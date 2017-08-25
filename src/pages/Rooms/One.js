import React, { Component } from 'react'
import { connect } from 'react-redux'
import { joinRoom } from '../../actions/rooms'
import { getRoom } from '../../reducers/rooms'

export class OneRoom extends Component {
  componentDidMount() {
    this.props.onJoin()
  }

  render() {
    const { match } = this.props

    return (
      <span>room {match.params.id}</span>
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  room: getRoom(state, match.params.id)
})

const mapDispatchToProps = (dispatch, { match }) => ({
  onJoin: () => dispatch(joinRoom(match.params.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OneRoom)
