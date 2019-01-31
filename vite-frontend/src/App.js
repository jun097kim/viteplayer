import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppTemplate from "components/base/AppTemplate";
import DevTools from "mobx-react-devtools";

import { Wallet, Auth } from "pages";

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
        <Route path="/auth" component={Auth} />
        {process.env.NODE_ENV === "development" && <DevTools />}
      </AppTemplate>
    );
  }
}

export default App;
