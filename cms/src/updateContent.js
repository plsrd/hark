import client from './client';

const updateContent = async setContent => {
  await client
    .get('*')
    .then(({ data }) => ({
      ...data,
      authors: data.users.filter(user => user.role != 'viewer'),
    }))
    .then(setContent);
};

export default updateContent;
