import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Card, CardHeader, RefreshIndicator } from 'material-ui'

import RolePicker from './RolePicker'

const enhance = compose(
  firebaseConnect(props => [
    { path: `conflicts/${props.match.params.conflictId}` },
  ]),
  connect((state, props) => {
    const { conflictId } = props.match.params
    return {
      conflict: _.get(
        state,
        `firebase.data.conflicts.${props.match.params.conflictId}`
      ),
      conflictId,
    }
  })
)

class Conflict extends React.Component {
  render() {
    const { conflict, conflictId } = this.props
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
    const hasRolepicker = !conflict.gm || !conflict.locked
    return (
      <Card>
        <CardHeader title={conflict.title} />
        {hasRolepicker && <RolePicker conflictId={conflictId} />}
      </Card>
    )
  }
}

Conflict.defaultProps = {
  conflict: undefined,
  conflictId: undefined,
}
Conflict.propTypes = {
  conflict: PropTypes.object,
  conflictId: PropTypes.string,
}
export default enhance(Conflict)
