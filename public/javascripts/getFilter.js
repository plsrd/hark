const moment = require('moment');

const getFilter = query => {
  return {
    ...(query.date && {
      createdAt: {
        $gte: moment(query.date).startOf('day').toDate(),
        $lt: moment(query.date).endOf('day').toDate(),
      },
    }),
  };
};

module.exports = getFilter;
