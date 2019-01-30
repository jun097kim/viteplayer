import React from "react";
import { withRouter } from "react-router-dom";
import { inject } from "mobx-react";

const WalletTemplate = withRouter(
  inject("wallet")(({ wallet }) => {
    wallet.integrateWallet();
    return null;
  })
);

export default WalletTemplate;
