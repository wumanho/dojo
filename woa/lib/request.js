const url = require("url");
const request = {
  get path() {
    const { pathname } = url.parse(this.req.url);
    return pathname;
  },
};

module.exports = request;
