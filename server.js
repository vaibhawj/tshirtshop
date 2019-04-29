const Koa = require('koa');
const staticCache = require('koa-static-cache');
const send = require('koa-send');
const path = require('path');
const enforceHttps = require('koa-sslify');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const apiRouter = require('./api')

const app = new Koa;

if ('dev' !== process.env.NODE_ENV) {
  app.use(enforceHttps({
    trustProtoHeader: true
  }));
}

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
require('./auth');

app.use(passport.initialize());
app.use(passport.session());

const assetspath = path.join(__dirname, 'public');
app.use(staticCache(assetspath));

app.use(apiRouter.routes());

app.use(function* index() {
  yield send(this, './public/index.html');
});

app.listen(process.env.PORT || 3000);
console.log(`listening on port ${process.env.PORT || 3000}`);