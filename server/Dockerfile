FROM hayd/alpine-deno:1.5.2

WORKDIR /app

COPY . .

USER deno

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "mod.ts"]

