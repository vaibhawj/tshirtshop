const Router = require('koa-router');
const { getProducts } = require('../db/products');

const router = new Router({ prefix: "/api" });

router.get('/products', async (ctx, next) => {
    ctx.body = await getProducts(ctx.request.query.departmentId, ctx.request.query.categoryId, ctx.request.query.searchString);
});

router.all('*', (ctx, next) => {
    ctx.status = 404;
});

module.exports = router;