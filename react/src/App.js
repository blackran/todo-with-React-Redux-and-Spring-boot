import React from 'react';
import ScrollableTabsButtonForce from './ScrollableTabsButtonForce'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Login from './Components/Login';
import error404 from './Components/error404';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const theme = createMuiTheme({
  palette:{
    primary: blueGrey,
    secondary: blueGrey
  }
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/Task" component={ScrollableTabsButtonForce} childer={this} />
            <Route component={error404} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
