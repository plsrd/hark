import React, { useContext, useEffect } from 'react';
import ContentContext from '../../../src/contentContext';
import client from '../../../src/client';
import Layout from '../../../components/Layout';

const EditorNode = ({ type, id, data }) => {
  const { activeDocument, setActiveDocument } = useContext(ContentContext);

  useEffect(() => {
    if (!activeDocument) {
      setActiveDocument({ type, id });
    }
  }, []);

  return <Layout></Layout>;
};

export default EditorNode;

export const getServerSideProps = async ({ params }) => {
  const { type, id } = params;
  const { data } = await client.get(type, id);
  return {
    props: {
      type,
      id,
      data,
    },
  };
};
