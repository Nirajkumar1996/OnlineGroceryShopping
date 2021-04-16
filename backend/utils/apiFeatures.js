class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    //for page 2 we have to skip first 4 products
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
