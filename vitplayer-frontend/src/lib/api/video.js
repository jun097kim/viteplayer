import defaultClient from 'lib/defaultClient';

export const list = () => {
  return defaultClient.post('/api/video/list');
};
