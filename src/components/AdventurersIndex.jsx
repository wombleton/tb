import React from 'react'
import { Link } from 'react-router-dom'

export default class AdventurersIndex extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/adventurers/new">Create New</Link>
        </div>
        <ul>
          <li>List of adventurers</li>
        </ul>
      </div>
    )
  }
}
