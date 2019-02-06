import React from 'react';
import './Header.scss';
import { Box, Text } from 'grommet';
import HeaderNav from './HeaderNav';

const Header = () => {
  return (
    <Box className="Header" direction="row" justify="between" margin="large">
      <Text className="logo" size="xlarge" weight="bold">
        <a href="/">vitplayer</a>
      </Text>
      <Box direction="row" flex={{ shrink: 0 }}>
        <HeaderNav />
      </Box>
    </Box>
  );
};

export default Header;
