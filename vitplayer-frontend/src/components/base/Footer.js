import React from 'react';
import './Footer.scss';
import { Box, Paragraph } from 'grommet';

const Footer = () => {
  return (
    <Box justify="between" margin="large">
      <Box direction="row" align="center">
        <Paragraph margin="none">© 2019 Viteplayer</Paragraph>
      </Box>
    </Box>
  );
};

export default Footer;
