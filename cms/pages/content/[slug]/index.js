import React from 'react';
import client from '../../../src/client';
import Layout from '../../../components/Layout';

const ContentType = ({ type, data }) => {
  const documentPreviews = data.map(document => {
    switch (type) {
      case 'posts':
        console.log(document.author);
        return (
          <div key={document._id}>
            <p>{document.title}</p>
            <p>{document.author.name}</p>
          </div>
        );
    }
  });
  return (
    <Layout>
      <div>{documentPreviews}</div>
    </Layout>
  );
};

export default ContentType;

export const getServerSideProps = async ({ query: { slug: type } }) => {
  const { data } = await client.get(type);

  return {
    props: {
      type,
      data,
    },
  };
};
