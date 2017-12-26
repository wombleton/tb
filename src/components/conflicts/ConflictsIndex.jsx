import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class ConflictsIndex extends React.Component {
  getConflicts = () => {
    const { conflicts } = this.props

    if (!isLoaded(conflicts)) {
      return 'loading'
    } else if (isEmpty(conflicts)) {
      return 'empty'
    }
    return Object.keys(conflicts).map((key, id) => (
      <div key={key}>
        {key} {id}
      </div>
    ))
  }
  render() {
    const conflictsList = this.getConflicts()
    return (
      <div>
        <h1>Conflicts</h1>
        {conflictsList}
      </div>
    )
  }
}

ConflictsIndex.defaultProps = {
  conflicts: undefined,
}
ConflictsIndex.propTypes = {
  conflicts: PropTypes.object,
}

export default compose(
  firebaseConnect({ path: '/conflicts' }),
  connect(state => ({
    conflicts: state.firebase.data.conflicts,
  }))
)(ConflictsIndex)
