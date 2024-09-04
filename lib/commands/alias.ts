import { config } from "../getConfig.ts";
import { args } from "../args.ts";
import { createCommand } from "../createCommand.ts";

export const alias = (): void => {
    const { main_container, aliases } = config;
    if (!main_container) return;

    createCommand("docker", [
        "exec",
        "-it",
        main_container,
        ...aliases[args[0]].replace(/\s+/g, " ").split(" "),
        ...args.slice(1),
    ]).spawn();
};
