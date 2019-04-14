const Router = require('koa-router');
const { getProducts } = require('../db/products');

const router = new Router({ prefix: "/api" });

router.get('/products', async (ctx, next) => {
    ctx.body = await getProducts();
});

router.all('*', (ctx, next) => {
    ctx.status = 404;
});

module.exports = router;