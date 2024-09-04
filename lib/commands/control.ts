import { config } from "../getConfig.ts";
import { args } from "../args.ts";
import { createCommand } from "../createCommand.ts";

export const control = (): void => {
    const { env, composer_file } = config;
    const envFile = env ? ["--env-file", env] : [];
    
    createCommand("docker-compose", [...[
        "-f",
        composer_file,
        ...envFile,
    ], ...args]).spawn();
};
