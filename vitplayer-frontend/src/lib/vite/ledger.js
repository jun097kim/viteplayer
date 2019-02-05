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
      const data = JSON.parse(str.data);
      console.log(data.result[0]);
    };

    websocket.send(
      JSON.stringify(
        jsonrpc.request(1, 'ledger_getVmLogList', [
          '5c58668fb882fc0363786206314c9a44bd0d95fc45d4bb24f6ffe4423acd03c9'
        ])
      )
    );
  };
};
