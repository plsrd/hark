import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import ContentContext from '../src/contentContext';
import contentTypes from '../src/contentTypes';

const List = () => {
  const { activeDocument, setActiveDocument } = useContext(ContentContext);
  const router = useRouter();

  const handleClick = type => {
    router.push(`/content/${type}`, undefined, { shallow: true });
    setActiveDocument({ type });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {contentTypes.map(type => (
        <button
          onClick={() => handleClick(type)}
          disabled={activeDocument?.type == type}
        >
          {type.slice(0, 1).toUpperCase().concat(type.slice(1))}
        </button>
      ))}
    </div>
  );
};

export default List;
