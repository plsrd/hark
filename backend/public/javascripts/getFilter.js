const moment = require('moment');

const getFilter = query => {
  return {
    ...(query.date && {
      createdAt: {
        $gte: moment(query.date).utc().startOf('day').toDate(),
        $lt: moment(query.date).utc().endOf('day').toDate(),
      },
    }),
  };
};

module.exports = getFilter;
