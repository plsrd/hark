import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import ContentContext from '../src/contentContext';
import contentTypes from '../src/contentTypes';
import {
  AiOutlineFile,
  AiOutlineUser,
  AiOutlinePicture,
  AiOutlineMessage,
} from 'react-icons/ai';

const List = () => {
  const { activeDocument, setActiveDocument } = useContext(ContentContext);
  const router = useRouter();

  const handleClick = type => {
    router.push(`/content/${type}`, undefined, { shallow: true });
    setActiveDocument({ type });
  };

  return (
    <>
      {contentTypes.map(type => {
        const listTitle = type.slice(0, 1).toUpperCase().concat(type.slice(1));
        return (
          <li
            key={type}
            onClick={() => handleClick(type)}
            disabled={activeDocument?.type == type}
          >
            <div>
              {(() => {
                switch (type) {
                  case 'posts':
                    return <AiOutlineFile size={28} />;
                  case 'users':
                    return <AiOutlineUser size={28} />;
                  case 'images':
                    return <AiOutlinePicture size={28} />;
                  case 'comments':
                    return <AiOutlineMessage size={28} />;
                  default:
                    return null;
                }
              })()}
              {listTitle}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default List;
