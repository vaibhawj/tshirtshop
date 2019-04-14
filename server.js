const Koa = require('koa');
const staticCache = require('koa-static-cache');
const send = require('koa-send');
const path = require('path');
const enforceHttps = require('koa-sslify');
const apiRouter = require('./api')

const app = new Koa;

const assetspath = path.join(__dirname, 'public');
app.use(staticCache(assetspath));

if ('dev' !== process.env.NODE_ENV) {
  app.use(enforceHttps({
    trustProtoHeader: true
  }));
}

app.use(apiRouter.routes());

app.use(function* index() {
  yield send(this, './public/index.html');
});

app.listen(process.env.PORT || 3000);
console.log(`listening on port ${process.env.PORT || 3000}`);