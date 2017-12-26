import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Conflict from './Conflict'
import ConflictsIndex from './ConflictsIndex'

import '../../api'

export default class Conflicts extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/conflicts" component={ConflictsIndex} />
        <Route path="/conflicts/:id" component={Conflict} />
      </Switch>
    )
  }
}
