import type { ComposeSpecification } from "./lib/types.ts";

const config: ComposeSpecification = {
    version: "3",
    services: {
        deno: {
            build: ".",
            container_name: "deno-app",
            stdin_open: true,
            tty: true,
            entrypoint: "../bin/deno",
            ports: ["8000:8000"],
            volumes: [".:/app"],
        },
        redis: {
            image: "redis",
        },
    },
};

export default config;