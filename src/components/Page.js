import React from 'react'
import { Heading, Section } from '../components/Section'

const Page = ({ children, className, loading }) => {
  const spinner = <Section loading heading={<Heading />} />

  return (
    <div id='page' className={className}>
      {loading ? spinner : children}
    </div>
  )
}

export default Page
