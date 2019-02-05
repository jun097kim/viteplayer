import React, { Component } from 'react';
import * as AuthAPI from 'lib/api/auth';
import { Box, FormField, TextInput, Button, Heading } from 'grommet';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    AuthAPI.login({
      email,
      password
    }).then(res => {
      history.push('/upload');
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Box>
        <Heading>Login</Heading>
        <FormField label="Email">
          <TextInput name="email" value={email} onChange={this.handleChange} />
        </FormField>
        <FormField label="Password">
          <TextInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </FormField>
        <Button label="Login" onClick={this.handleLogin} primary />
      </Box>
    );
  }
}

export default Login;
