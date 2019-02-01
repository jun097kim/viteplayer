import React, { Component, Fragment } from 'react';
import { Grommet, Box } from 'grommet';
import './AppTemplate.scss';
import Header from './Header';

class AppTemplate extends Component {
  render() {
    const { children } = this.props;

    return (
      <Grommet className="AppTemplate">
        <Header />
        <Box align="center">{children}</Box>
      </Grommet>
    );
  }
}

export default AppTemplate;
