import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'
import { FormattedRelative } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import AddConflict from './AddConflict'

class ConflictsIndex extends React.Component {
  _addConflict = () => {
    const { firebase } = this.props
    const createdAt = Date.now()
    firebase.push('/conflicts', { createdAt })
  }
  _getConflicts = () => {
    const { conflicts } = this.props

    if (!isLoaded(conflicts)) {
      return 'loading'
    } else if (isEmpty(conflicts)) {
      return 'empty'
    }
    const items = _.map(conflicts, (conflict, key) => {
      const { createdAt } = conflict
      return (
        <ListItem
          key={key}
          containerElement={<Link to={`/conflicts/${key}`} />}
        >
          <FormattedRelative value={new Date(createdAt)} />
        </ListItem>
      )
    }).reverse()
    return <List>{items}</List>
  }
  render() {
    const conflictsList = this._getConflicts()
    return (
      <div>
        <h1>Conflicts</h1>
        <AddConflict history={this.props.history} />
        {conflictsList}
      </div>
    )
  }
}

ConflictsIndex.defaultProps = {
  conflicts: undefined,
  firebase: undefined,
  history: undefined,
}
ConflictsIndex.propTypes = {
  conflicts: PropTypes.object,
  firebase: PropTypes.object,
  history: PropTypes.object,
}

export default compose(
  firebaseConnect([
    {
      path: '/conflicts',
      queryParams: ['limitToLast=5'],
    },
  ]),
  connect(state => ({
    conflicts: state.firebase.data.conflicts,
  }))
)(ConflictsIndex)
