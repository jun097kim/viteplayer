import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppTemplate from "components/base/AppTemplate";
import { Wallet } from "pages";

class App extends Component {
  render() {
    return (
      <AppTemplate>
        <Route path="/wallet" component={Wallet} />
      </AppTemplate>
    );
  }
}

export default App;
