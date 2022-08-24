import React, { useContext, useEffect } from 'react';
import Layout from '../../../components/Layout';
import ContentContext from '../../../src/contentContext';

const ContentType = ({ type }) => {
  const { activeDocument, setActiveDocument } = useContext(ContentContext);

  useEffect(() => {
    setActiveDocument({
      type,
    });
  }, []);

  return <Layout></Layout>;
};

export default ContentType;

export const getServerSideProps = async ({ params: { type } }) => {
  return {
    props: {
      type,
    },
  };
};
