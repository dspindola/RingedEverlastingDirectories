import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { getUserInfo } from "@replit/repl-auth";
import { Elysia } from "elysia";

export const setup = () => new Elysia({
    name: 'server',
    analytic: true,
    serve: {
        hostname: process.env.hostname || '0.0.0.0',
        port: process.env.port || 3000,
        development: process.env.NODE_ENV !== 'production',
    },
    experimental: {
        plugins: {
            static: true,
            html: true,
            cors: true,
        }
    }
})
    .use(staticPlugin({
        prefix: "/",
        alwaysStatic: false,
        directive: "public",
        indexHTML: true,
        staticLimit: 1024 * 3,
    }))
    .use(cors())
    .use(html({
        autoDoctype: true
    }));

export const hooks = (app: ReturnType<typeof setup>) => {
    return app
        .onBeforeHandle((handler) => {
            console.log('before handle');
            console.log(handler.path);
        })
        .onAfterHandle((handler) => {
            console.log('after handle');
            console.log(handler.path);
        })
        .onError((error) => {
            console.error(error);
        })
        .onRequest((handler) => {
            console.log('request');
        })
        .onResponse((handler) => {
            console.log('response');
        })
        .onTransform((handler) => {
            console.log('transform');
        })

}

export default (app: ReturnType<typeof hooks>) => app
    .all('/', (ctx) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const user = getUserInfo(ctx.request as any);
        console.log(user);
        return user;
    })