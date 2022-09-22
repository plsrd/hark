import React from 'react';
import DocumentTable from '../../../components/DocumentTable';
import Layout from '../../../components/Layout';
import client from '../../../src/client';

const ContentTypeBulkEditor = ({ type, data }) => {
  return (
    <Layout>
      <div className='w-9/12'>
        <div className='tab tab-lifted bg-base-200 border-b-0 text-base-content'>
          {`All ${type.slice(0, 1).toUpperCase() + type.slice(1)}`}
        </div>
        <div
          className='preview bg-base-200 rounded-b-box rounded-tr-box flex flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4'
          style={{
            backgroundImage:
              'radial-gradient(hsla(37 67% 58%/.2) 1px, hsla(270 4% 9%) 1px)',
            backgroundSize: '5px 5px',
            backgroundPosition: '-19px -19px',
          }}
        >
          <DocumentTable data={data} type={type} />
        </div>
      </div>
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
