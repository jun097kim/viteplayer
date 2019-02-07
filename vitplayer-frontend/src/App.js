import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import AppTemplate from 'components/base/AppTemplate';
import DevTools from 'mobx-react-devtools';

import {
  Landing,
  Wallet,
  Auth,
  Upload,
  Video,
  Verify,
  VerifyResult
} from 'pages';

import * as LedgerAPI from 'lib/vite/ledger';
import * as ClientAPI from 'lib/vite/client';
import { inject } from 'mobx-react';

@withRouter
@inject(stores => ({
  login: stores.auth.login
}))
class App extends Component {
  constructor() {
    super();
    this.loggedInfo = JSON.parse(localStorage.getItem('loggedInfo'));
  }

  initializeUserInfo = () => {
    if (!this.loggedInfo) return;
    const { login } = this.props;
    login(this.loggedInfo);
  };

  componentDidMount() {
    this.initializeUserInfo();
    LedgerAPI.getSnapshotChainHeight();
    LedgerAPI.getVmLogList();
    ClientAPI.getAccountBlock();
  }

  render() {
    return (
      <AppTemplate>
        <Route path="/" component={Landing} exact />
        <Route path="/wallet" component={Wallet} />
        <Route path="/auth" component={Auth} />
        <Route path="/upload" component={Upload} />
        <Route path="/list" component={Video} />
        <Route path="/verify" component={Verify} />
        <Route path="/result" component={VerifyResult} />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </AppTemplate>
    );
  }
}

export default App;
