import { args } from "../args.ts";
import { createCommand } from "../createCommand.ts";
import { config } from "../getConfig.ts";
import { alias } from "./alias.ts";

export const defaultRun = (): void => {
    const { main_container, aliases } = config;
    if (aliases[args[0]]) {
        alias();
        return;
    }
    createCommand("docker", [
        "exec",
        "-it",
        main_container,
        ...args,
    ]).spawn();
};
