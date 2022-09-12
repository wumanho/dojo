const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Woa {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    this.fn = fn;
  }

  listen(port, cb) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, cb);
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.fn(ctx);
    res.end(ctx.body)
  }

  createContext(req, res) {
    const ctx = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    ctx.request = request; // 自己封装的请求
    ctx.request.req = ctx.req = req; // 原生请求
    ctx.response = response; // 自己封装的响应
    ctx.response.res = ctx.res = res; // 原生响应

    return ctx;
  }
}

module.exports = Woa;
