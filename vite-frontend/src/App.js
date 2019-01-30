import React, { Component } from "react";
import provider from "@vite/vitejs/dist/es5/provider/WS";
import { client } from "@vite/vitejs";

class App extends Component {
  componentDidMount() {
    const WS_RPC = new provider("ws://127.0.0.1:41420");
    const myClient = new client(WS_RPC, _myClient => {
      console.log("Connected");
    });

    myClient.ledger
      .getSnapshotChainHeight()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    return null;
  }
}

export default App;
