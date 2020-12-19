import { log, Application, send } from "./deps.ts";

import api from "./router/api.ts";

const app = new Application();

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

app.addEventListener("error", (event) => {
  log.error(event.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.response.body = "Internal Server Error";
    throw new Error(error);
  }
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
  const path = ctx.request.url.pathname;
  const witheList = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images, favicon.png",
    "/videos/space.mp4",
  ];

  if (witheList.includes(path)) {
    await send(ctx, path, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

if (import.meta.main) {
  const port = Number(Deno.env.get("PORT") || 9000);
  log.info(`Server is running on http://localhost:${port}`);
  await app.listen({ port });
}
