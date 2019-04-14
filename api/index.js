const Router = require('koa-router');

const router = new Router({prefix: "/api"});

router.get('/hello', (ctx, next) => {
  ctx.body = 'Hello World!';
 });

router.all('*', (ctx, next) => {
  ctx.status = 404;
});

module.exports = router;