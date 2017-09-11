import React from 'react'
import Section from '../../components/Section'
import RoomUsers from './_Users'

const RoomSidebar = ({ room }) => (
  <Section>
    <RoomUsers room={room} />
  </Section>
)

RoomSidebar.displayName = 'RoomSidebar'

export default RoomSidebar
