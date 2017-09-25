import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../css/Header.scss'
import classnames from 'classnames'
import buttons from '../css/_buttons.scss'

class Header extends React.Component {
  isFlags(match, location) {
    if (!match) {
      return false
    } else if (match.isExact) {
      return true
    } else {
      return location.pathname.indexOf('/flags/') === 0
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
                isActive={this.isFlags}
                activeClassName={buttons.activeNav}
                to="/"
              >
                Flags
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                activeClassName={buttons.activeNav}
                to="/customers"
              >
                Customers
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
