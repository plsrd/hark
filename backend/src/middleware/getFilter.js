const moment = require('moment');

const dateFields = ['createdAt', 'updatedAt'];

const createFilter = (query, key) => {
  const expression = query[key].split(':');
  return { [expression[0]]: expression[1] };
};

const createDateFilter = (query, key) => {
  if (typeof query[key] == 'object') {
    let dateFilter = {};
    query[key].forEach(filter => {
      const expression = filter.split(':');
      Object.assign(dateFilter, {
        [expression[0]]: moment(expression[1]).utc().startOf('day').toDate(),
      });
    });

    return dateFilter;
  } else {
    return createFilter(query, key);
  }
};

const getFilter = query => {
  const fields = Object.keys(query)
    .filter(key => key != 'sort')
    .map(key => {
      if (dateFields.includes(key)) {
        return { [key]: createDateFilter(query, key) };
      } else {
        return { [key]: createFilter(query, key) };
      }
    });

  if (fields.length > 1) {
    return {
      ...(fields.length > 1 && {
        $and: fields,
      }),
    };
  } else if (fields.length == 1) {
    return { ...fields[0] };
  }
};

module.exports = getFilter;
