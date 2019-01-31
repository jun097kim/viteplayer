import React from 'react';
import { Route } from 'react-router-dom';
import { AuthTemplate, Login, Register } from 'components/auth';

const Auth = () => {
  return (
    <AuthTemplate>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
    </AuthTemplate>
  );
};

export default Auth;
