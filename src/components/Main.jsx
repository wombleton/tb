import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Customers from './Customers'
import Flags from './Flags'

import styles from '../css/Base.scss'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  render() {
    return (
      <main className={styles.inset}>
        <Switch>
          <Route exact path="/" component={Flags} />
          <Route path="/flags" component={Flags} />
          <Route path="/customers" component={Customers} />
        </Switch>
      </main>
    )
  }
}
export default Main
