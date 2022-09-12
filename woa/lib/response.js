const response = {
  _body: undefined,
  get body() {
    return this._body;
  },
  set body(val) {
    console.log(val,'v')
    this._body = val;
  },
};

module.exports = response;
