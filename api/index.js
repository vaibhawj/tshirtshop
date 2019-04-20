const Router = require('koa-router');
const { getProducts, getProductAttributes } = require('../db/products');

const router = new Router({ prefix: "/api" });

router.get('/products/:id/attributes', async (ctx, next) => {
    ctx.body = await getProductAttributes(ctx.params.id);
});

router.get('/products', async (ctx, next) => {
    ctx.body = await getProducts(ctx.request.query.departmentId, ctx.request.query.categoryId, ctx.request.query.searchString);
});

router.all('*', (ctx, next) => {
    ctx.status = 404;
});

module.exports = router;