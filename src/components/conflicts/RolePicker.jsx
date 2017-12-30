import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { CardActions, FlatButton } from 'material-ui'
import { CardText } from 'material-ui/Card'

class RolePicker extends React.Component {
  getJoinTools(users) {
    const hasGm = _.find(users, { role: 'gm' })
    const players = _.filter(users, { role: 'player' })
    return (
      <CardActions>
        {!hasGm && (
          <FlatButton primary label="Join as GM" onClick={this.claimGm} />
        )}
        {players.length < 5 && (
          <FlatButton label="Join as Player" onClick={this.joinAsPlayer} />
        )}
      </CardActions>
    )
  }
  claimGm = () => {
    const { conflictId, firebase } = this.props
    const { uid } = firebase.auth().currentUser
    firebase.set(`/conflicts/${conflictId}/users/${uid}/role`, 'gm')
  }
  joinAsPlayer = () => {
    const { conflictId, firebase } = this.props
    const { uid } = firebase.auth().currentUser
    firebase.set(`/conflicts/${conflictId}/users/${uid}/role`, 'player')
  }
  render() {
    const { conflict = {}, firebase } = this.props
    const { users } = conflict
    const { uid } = firebase.auth().currentUser

    const user = _.get(conflict, `users.${uid}`)

    if (user) {
      if (user.role === 'gm') {
        return <CardText>You&quot;re the GM</CardText>
      }
      return <CardText>You&quot;re a player </CardText>
    }

    return this.getJoinTools(users)
  }
}

RolePicker.defaultProps = {
  firebase: undefined,
}
RolePicker.propTypes = {
  conflict: PropTypes.object.isRequired,
  conflictId: PropTypes.string.isRequired,
  firebase: PropTypes.object,
}

const enhance = compose(
  withFirebase,
  connect((state, props) => ({
    conflict: _.get(state, `firebase.data.conflicts.${props.conflictId}`),
  }))
)
export default enhance(RolePicker)
