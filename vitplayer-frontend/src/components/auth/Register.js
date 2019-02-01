import React, { Component } from 'react';
import * as AuthAPI from 'lib/api/auth';
import { Box, FormField, TextInput, Button, Heading } from 'grommet';

class Register extends Component {
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

  handleRegister = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    AuthAPI.register({
      email,
      password
    }).then(res => {
      history.push('/');
    });
  };

  render() {
    return (
      <Box>
        <Heading>Register</Heading>
        <FormField label="Email">
          <TextInput />
        </FormField>
        <FormField label="Password">
          <TextInput type="password" />
        </FormField>
        <Button label="Register" onClick={this.handleRegister} primary />
      </Box>
    );
  }
}

export default Register;
