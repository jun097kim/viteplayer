import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Anchor } from 'grommet';

const HeaderNav = inject('auth')(
  observer(({ auth, history }) => {
    if (!auth.isLogged) {
      console.log(auth.isLogged);
      return (
        <Fragment>
          <Anchor href="/auth/login" margin={{ horizontal: '1rem' }}>
            Login
          </Anchor>
          <Anchor href="/auth/register" margin={{ horizontal: '1rem' }}>
            Register
          </Anchor>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Anchor href="/upload" margin={{ horizontal: '1rem' }}>
            Upload
          </Anchor>
          <Anchor
            margin={{ horizontal: '1rem' }}
            onClick={() => {
              auth.logout();
              console.log(history);
              history.push('/');
            }}
          >
            Logout
          </Anchor>
        </Fragment>
      );
    }
  })
);

export default HeaderNav;
