import React, { Component, Fragment } from "react";
import { Grommet, Box } from "grommet";
import "./AppTemplate.scss";

class AppTemplate extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Grommet className="AppTemplate">
          <Box align="center">{children}</Box>
        </Grommet>
      </Fragment>
    );
  }
}

export default AppTemplate;
