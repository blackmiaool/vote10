const Koa = require('koa');
const db = require('./db');
const app = new Koa();
const Router = require("koa-router");
const path = require('path');
const convert = require("koa-convert");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser")();
const logger = require("koa-logger");


const router = new Router({
    prefix: '/vote10-api'
});
const staticRouter = new Router({
    prefix: "/vote10"
});
const config = require("../conf/config.js");
const cors = require("kcors");
const request = require("request-promise-native");
const jwt = require("jsonwebtoken");

const jwtKey = "w0938jkwmwosllkcv";

function getJwt(value) {
    return jwt.sign(value, jwtKey);
}

function ensureLogin(ctx) {
    if (!getUser(ctx)) {
        ctx.status = 401;
        return true;
    }
    return false;
}

function getUser(ctx) {
    const userJwt = ctx.cookies.get('user');
    if (!userJwt) {
        ctx.status = 401;
        return false;
    }
    let decoded;
    try {
        decoded = jwt.verify(userJwt, jwtKey);
    } catch (err) {
        console.log('err', err);
        return false;
    }
    return decoded;
}
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
router.post("/getVoteList", async (ctx) => {
    if (ensureLogin(ctx)) {
        return;
    }
    ctx.body = await db.getVoteList();
    ctx.status = 200;
});

router.post("/getUserName", async ctx => {
    if (ensureLogin(ctx)) {
        return;
    }
    const user = getUser(ctx);
    ctx.body = {
        code: 0,
        data: user
    };
    ctx.status = 200;
});

console.log('process.env.db', process.env.db);
app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err, ctx) => {
    console.log(err, ctx);
    //    logger.error('server error', err, ctx);
});

const port = config.serverPort;
console.log(new Date().toLocaleTimeString(), `listen on ${port}`);
app.listen(port);
module.exports = app;
