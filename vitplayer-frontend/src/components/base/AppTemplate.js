import React, { Component } from 'react';
import { Grommet, Box } from 'grommet';
import './AppTemplate.scss';
import Header from './Header';
import Footer from './Footer';

class AppTemplate extends Component {
  render() {
    const { children } = this.props;

    return (
      <Grommet className="AppTemplate">
        <Header />
        <div className="Sections">
          <Box align="center" margin={{ vertical: 'large' }}>
            {children}
          </Box>
        </div>
        <Footer />
      </Grommet>
    );
  }
}

export default AppTemplate;
