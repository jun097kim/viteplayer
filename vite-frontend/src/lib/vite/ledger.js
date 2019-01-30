import vite from "lib/vite";

export const getSnapshotChainHeight = () => {
  vite.ledger
    .getSnapshotChainHeight()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.warn(err);
    });
};
