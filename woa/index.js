const Woa = require("./lib");

const app = new Woa();

app.use((ctx) => {
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);

  console.log(ctx.request.path);
  console.log(ctx.path);

  ctx.body = 'wumanho'
  console.log(ctx.body,'body')
});

app.listen(3000, () => {
  console.log("hi1");
});
