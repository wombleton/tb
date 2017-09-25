import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../css/Header.scss'
import classnames from 'classnames'
import buttons from '../css/_buttons.scss'

class Header extends React.Component {
  isHome(match) {
    if (!match) {
      return false
    } else {
      return match.isExact
    }
  }
  render() {
    return (
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink
                className={styles.link}
                isActive={this.isHome}
                activeClassName={buttons.activeNav}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                activeClassName={buttons.activeNav}
                to="/adventurers"
              >
                Adventurers
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
