import vite from 'lib/vite';
const jsonrpc = require('jsonrpc-lite');

const ledger = vite.ledger;
const websocket = new WebSocket('ws://127.0.0.1:41420');

export const getSnapshotChainHeight = () => {
  ledger
    .getSnapshotChainHeight()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.warn(err);
    });
};

export const getVmLogList = () => {
  websocket.onopen = () => {
    websocket.onmessage = function(str) {
      console.log('Someone sent: ', str);
    };

    websocket.send(
      JSON.stringify(
        jsonrpc.request(1, 'ledger_getVmLogList', [
          'c6d05c585edbbcfd60409f70834819e80020ba8301448930657ba63e3598c1db'
        ])
      )
    );
  };

  console.log('getVmLogList:', ledger);
};
