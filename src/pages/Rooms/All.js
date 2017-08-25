import React from 'react'
import { Link } from 'react-router-dom'

export const AllRooms = ({ match }) => (
  <div>
    <h1>Rooms</h1>
    <ul>
      <li>
        <Link to={ match.url + '/lobby'}>
          Lobby
        </Link>
      </li>
    </ul>
  </div>
)

AllRooms.displayName = 'AllRooms'

export default AllRooms
