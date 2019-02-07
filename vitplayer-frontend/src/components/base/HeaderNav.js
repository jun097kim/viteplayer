import React from 'react';
import { inject, observer } from 'mobx-react';
import { Anchor } from 'grommet';

const HeaderNav = inject('auth')(
  observer(({ auth, history }) => {
    if (!auth.isLogged) {
      console.log(auth.isLogged);
      return (
        <>
          <Anchor href="/auth/login" margin={{ horizontal: '1rem' }}>
            Login
          </Anchor>
          <Anchor href="/auth/register" margin={{ horizontal: '1rem' }}>
            Register
          </Anchor>
        </>
      );
    } else {
      return (
        <>
          <Anchor href="/list" margin={{ horizontal: '1rem' }}>
            Video
          </Anchor>
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
        </>
      );
    }
  })
);

export default HeaderNav;
