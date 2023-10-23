const {sortByDisplayOrder} = require('../utils');

/** Returns all pages as a collection. */
const getAllPages = collection => {
  return collection.getFilteredByGlob('./src/pages/*.md');
};

/** Returns sorted pages as a collection. */
const getAllSortedPages = collection => {
  return sortByDisplayOrder(collection.getFilteredByGlob('./src/pages/*.md'));
};

module.exports = {
  getAllPages,
  getAllSortedPages
};
