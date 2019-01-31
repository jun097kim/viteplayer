import React from 'react';
import { Box, FormField, TextInput, Button } from 'grommet';

const Login = () => {
  return (
    <Box>
      <FormField label="ID">
        <TextInput />
      </FormField>
      <FormField label="Password">
        <TextInput type="password" />
      </FormField>
      <Button label="Login" primary />
    </Box>
  );
};

export default Login;
