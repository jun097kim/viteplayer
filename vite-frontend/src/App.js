import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppTemplate from "components/base/AppTemplate";
import { Wallet } from "pages";

import * as LedgerAPI from "lib/vite/ledger";
import * as ClientAPI from "lib/vite/client";

class App extends Component {
  componentDidMount() {
    LedgerAPI.getSnapshotChainHeight();
    LedgerAPI.getVmLogList();
    ClientAPI.getAccountBlock();
  }

  render() {
    return (
      <AppTemplate>
        <Route path="/wallet" component={Wallet} />
      </AppTemplate>
    );
  }
}

export default App;
