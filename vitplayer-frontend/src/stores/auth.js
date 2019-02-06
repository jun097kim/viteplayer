import { observable, action } from 'mobx';

export default class AuthStore {
  @observable
  isLogged = false;

  @action
  login = loggedInfo => {
    localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
    this.isLogged = true;
  };

  @action
  logout = () => {
    localStorage.removeItem('loggedInfo');
    this.isLogged = false;
  };
}
