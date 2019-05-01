const Router = require('koa-router');
const passport = require('koa-passport');

const { getProducts, getProductAttributes, getProduct } = require('../db/products');
const { addCustomer } = require('../db/customers');

const router = new Router({ prefix: "/api" });

router.get('/auth/status', ctx => {
    ctx.body = ctx.state.user ? ctx.state.user.email : false
});

router.post('/auth/signup', async (ctx, next) => {

    if (!ctx.request.body || !ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password) {
        ctx.status = 400;
        ctx.body = "name, email and password are mandatory"
        return;
    }
    return addCustomer(ctx.request.body).then(
        passport.authenticate('local', () => {
            ctx.body = ctx.request.body.email;
            ctx.login(ctx.request.body);
        })(ctx, next)
    );
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