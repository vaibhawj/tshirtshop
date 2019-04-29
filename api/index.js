const Router = require('koa-router');
const passport = require('koa-passport');

const { getProducts, getProductAttributes, getProduct } = require('../db/products');

const router = new Router({ prefix: "/api" });

router.get('/auth/status', ctx => {
    ctx.body = ctx.state.user ? ctx.state.user.email : false
});

router.post('/auth/login', async (ctx, next) => {
    return passport.authenticate('local', (_, user) => {
        if (user) {
            ctx.body = user.email;
            ctx.login(ctx.request.body);
        } else {
            ctx.logout();
            ctx.status = 401
        }
    })(ctx, next);
});

router.post('/auth/logout', ctx => {
    ctx.logout();
    ctx.status = 200;
});

router.get('/products/:id/attributes', async (ctx, next) => {
    ctx.body = await getProductAttributes(ctx.params.id);
});

router.get('/products/:id', async (ctx, next) => {
    ctx.body = await getProduct(ctx.params.id);
});

router.get('/products', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        console.log("user", ctx.state.user)
    }
    ctx.body = await getProducts(ctx.request.query.departmentId, ctx.request.query.categoryId, ctx.request.query.searchString);
});

router.all('*', (ctx, next) => {
    ctx.status = 404;
});

module.exports = router;