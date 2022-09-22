import React from 'react';
import DocumentTable from '../../../components/DocumentTable';
import EditorWrapper from '../../../components/EditorWrapper';
import Layout from '../../../components/Layout';
import client from '../../../src/client';

const ContentTypeBulkEditor = ({ type, data }) => {
  return (
    <Layout>
      <EditorWrapper type={type}>
        <DocumentTable data={data} type={type} />
      </EditorWrapper>
    </Layout>
  );
};

export default ContentTypeBulkEditor;

export const getServerSideProps = async ({ params: { type } }) => {
  const { data } = await client.get(type);

  return {
    props: {
      type,
      data,
    },
  };
};
