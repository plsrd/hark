import React from 'react';

const ContentContext = React.createContext({
  content: {},
  setContent: content => {},
});

export const ContentProvider = ContentContext.Provider;

export default ContentContext;
