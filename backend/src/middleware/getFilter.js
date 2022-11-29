const moment = require('moment');

const dateFields = ['createdAt', 'updatedAt'];

const getFilter = query => {
  const filters = Object.keys(query)
    .filter(key => key != 'sort')
    .map(key => {
      const expr = query[key].split(':');

      return dateFields.includes(key)
        ? {
            [key]: {
              [expr[0]]: moment(expr[1]).utc().startOf('day').toDate(),
            },
          }
        : {
            [key]: {
              [expr[0]]: expr[1],
            },
          };
    });

  return {
    ...(filters.length > 0 && {
      $and: filters,
    }),
  };
};

module.exports = getFilter;
