import React from 'react';
import './Header.scss';
import { Box, Text, Anchor } from 'grommet';

const Header = () => {
  return (
    <Box className="Header" direction="row" justify="between" margin="large">
      <Text className="logo" size="xlarge" weight="bold">
        <a href="/">vitplayer</a>
      </Text>
      <Box direction="row" flex={{ shrink: 0 }}>
        <Anchor href="/auth/login" margin={{ horizontal: '1rem' }}>
          Login
        </Anchor>
        <Anchor href="/auth/register" margin={{ horizontal: '1rem' }}>
          Register
        </Anchor>
      </Box>
    </Box>
  );
};

export default Header;
