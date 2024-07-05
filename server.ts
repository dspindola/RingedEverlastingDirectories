import App, { hooks, setup } from "./src/app";

function start(props?: {
    serve?: {
        hostname?: string | undefined;
        port?: number | string | undefined;
        development?: boolean | undefined;
    } | undefined,
    name?: string;
    analytic?: boolean;
    experimental?: {
        plugins?: {
            static: boolean;
            html: boolean;
            cors: boolean;
        }
    }
}) {
    console.log(props);
}

const app = App(hooks(setup()))
    .onStart(handler => {
        start({
            serve: handler.config.serve,
            name: handler.config.name,
            analytic: handler.config.analytic,
            experimental: handler.config.experimental,
        });
    })
    .onStop(() => {
        console.log("Server stopped");
    })
    .listen({
        port: process.env.port || 3000,
        hostname: process.env.hostname || '0.0.0.0',
        development: process.env.NODE_ENV !== 'production',
    });

console.log(`Server running on ${app.server?.url}`);