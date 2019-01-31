import defaultClient from 'lib/defaultClient';

export const register = ({ email, password }) => {
  return defaultClient.post('/api/auth/register', {
    email,
    password
  });
};

export const login = ({ email, password }) => {
  return defaultClient.post('/api/auth/login', {
    email,
    password
  });
};
