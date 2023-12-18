import axios from 'axios';

export const getUsers = async () => {
  const users = await axios.get('/api/users');
  return users.data;
};
