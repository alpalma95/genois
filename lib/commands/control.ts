import { getConfig } from "../utils/getConfig.ts";
import { args } from "../utils/args.ts";
import { createCommand } from "../utils/createCommand.ts";

export const control = async (): Promise<void> => {
    const { env, compose_file } = await getConfig();
    const composeFile = compose_file ? ["-f", compose_file] : [];
    const envFile = env ? ["--env-file", env] : [];
    
    createCommand("docker", [...[
        "compose",
        ...composeFile,
        ...envFile,
    ], ...args]).spawn();
};
