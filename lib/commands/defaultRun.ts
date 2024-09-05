import { args, flags } from "../utils/args.ts";
import { createCommand } from "../utils/createCommand.ts";
import { getConfig } from "../utils/getConfig.ts";

export const defaultRun = async (): Promise<void> => {
    const { main_container, aliases } =await getConfig();
    const containerName = flags.name ?? main_container;
    const argsList = aliases![args[0]].replace(/\s+/g, " ").split(" ") ?? args;

    createCommand("docker", [
        "exec",
        "-it",
        containerName,
        ...argsList,
    ]).spawn();
};
