import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Adventurer from './Adventurer'
import AdventurersIndex from './AdventurersIndex'
import CreateAdventurer from './CreateAdventurer'

export default class Adventurers extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/adventurers" component={AdventurersIndex} />
        <Route path="/adventurers/new" component={CreateAdventurer} />
        <Route path="/adventurers/:id" component={Adventurer} />
      </Switch>
    )
  }
}
