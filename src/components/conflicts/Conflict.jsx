import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Card, CardHeader, RefreshIndicator } from 'material-ui'

const enhance = compose(
  firebaseConnect(props => [
    { path: `conflicts/${props.match.params.conflictId}` },
  ]),
  connect((state, props) => ({
    conflict: _.get(
      state,
      `firebase.data.conflicts.${props.match.params.conflictId}`
    ),
  }))
)

class Conflict extends React.Component {
  render() {
    const { conflict } = this.props
    if (!conflict) {
      return (
        <RefreshIndicator
          left={0}
          top={0}
          style={{ position: 'relative' }}
          status="loading"
        />
      )
    }
    return (
      <Card>
        <CardHeader title={conflict.title} />
      </Card>
    )
  }
}

Conflict.defaultProps = {
  conflict: undefined,
}
Conflict.propTypes = {
  conflict: PropTypes.object,
}
export default enhance(Conflict)
