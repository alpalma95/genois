import { args, flags } from "../args.ts";
import { createCommand } from "../createCommand.ts";

export const flag = (): void => {
    createCommand("docker", ["exec", "-it", flags.name, ...args])
        .spawn();
};
