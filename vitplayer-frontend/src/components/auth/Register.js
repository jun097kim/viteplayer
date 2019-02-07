import React, { Component } from 'react';
import * as AuthAPI from 'lib/api/auth';
import { Box, Form, FormField, TextInput, Button, Heading } from 'grommet';

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
        <Form onSubmit={this.handleRegister}>
          <FormField label="Email">
            <TextInput type="email" required />
          </FormField>
          <FormField label="Password">
            <TextInput type="password" required />
          </FormField>
          <Button type="submit" label="Register" primary />
        </Form>
      </Box>
    );
  }
}

export default Register;
