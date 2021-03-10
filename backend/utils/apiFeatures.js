class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {};

    //console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //console.log(queryCopy); //{ keyword: 'Apple', category: 'Fruits' }
    //Removing fields from query string
    //why? for filter keyword not present in schema limit &page for pagination
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    //console.log(queryCopy); //{ category: 'Fruits' } after removing keyword field

    //console.log(queryCopy); //{ price: { gte: '1', lte: '500' } }
    //since gte and lte are mongodb operator we have to only add $ before them
    //advanced filter for price , ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    //console.log(queryStr); //{"price":{"$gte":"1","$lte":"21"}}

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = APIFeatures;
