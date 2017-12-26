import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import Main from './Main'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Main />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
