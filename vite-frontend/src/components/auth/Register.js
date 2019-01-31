import React from "react";
import { Box, FormField, TextInput, Button } from "grommet";

const Register = () => {
  return (
    <Box>
      <FormField label="ID">
        <TextInput />
      </FormField>
      <FormField label="Password">
        <TextInput type="password" />
      </FormField>
      <Button label="Register" primary />
    </Box>
  );
};

export default Register;
