const getSort = sort => {
  if (sort) {
    const sortOrder = sort.split(':');
    return { [sortOrder[0]]: sortOrder[1] == 'desc' ? -1 : 1 };
  }
  return {};
};

module.exports = getSort;
