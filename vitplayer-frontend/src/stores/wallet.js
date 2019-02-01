import { observable, action } from 'mobx';
import { wallet, utils } from '@vite/vitejs';
import vite from 'lib/vite';

const { account } = wallet;

class WalletStore {
  @observable
  accountInstance = null;

  @action
  integrateWallet = () => {
    const accountInstance = new account({
      privateKey: utils.ed25519.keyPair().secretKey,
      client: vite
    });
    const obj = {
      address: accountInstance.address,
      privateKey: accountInstance.privateKey
    };
    localStorage.setItem('accountInstance', JSON.stringify(obj));
    this.accountInstance = accountInstance;

    accountInstance
      .getBalance()
      .then(result => {
        console.log('result', result);
      })
      .catch(err => {
        console.warn(err);
      });
  };
}

export default WalletStore;
