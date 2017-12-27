import React from 'react'
import PropTypes from 'prop-types'

import { Dialog, FlatButton, TextField } from 'material-ui'
import { withFirebase } from 'react-redux-firebase'

class AddConflict extends React.Component {
  state = {
    open: false,
  }
  close = () => {
    this.setState({ open: false })
  }
  open = () => {
    this.setState({ open: true })
  }
  _addConflict = () => {
    const { firebase, history } = this.props
    const createdAt = Date.now()
    const title = this.textfield.getValue()
    const { key } = firebase.push('/conflicts', { createdAt, title })
    history.push(`/conflicts/${key}`)
  }
  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.close} />,
      <FlatButton label="Create" primary onClick={this._addConflict} />,
    ]
    return (
      <div>
        <FlatButton label="Add" onClick={this.open} />
        <Dialog
          title="Add New Conflict"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Name this conflict"
            ref={c => {
              this.textfield = c
            }}
          />
        </Dialog>
      </div>
    )
  }
}

AddConflict.defaultProps = {
  firebase: undefined,
}
AddConflict.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object.isRequired,
}

export default withFirebase(AddConflict)
