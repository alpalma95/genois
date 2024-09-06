import { args, flags } from "../utils/args.ts";
import { createCommand } from "../utils/createCommand.ts";
import { getConfig } from "../utils/getConfig.ts";

export const defaultRun = async (): Promise<void> => {
    const { main_container, aliases } = await getConfig();
    const containerName = flags.name ?? main_container;
    const alias = aliases![args[0]]
        ? aliases![args[0]].replace(/\s+/g, " ").split(" ")
        : [];
    
    const argsList = alias.length && args.length > 1
        ? [...alias, ...args.slice(1)]
        : alias.length && args.length === 1
        ? [...alias]
        : !alias.length && args.length
        ? args
        : args;

    createCommand("docker", [
        "exec",
        "-it",
        containerName,
        ...argsList,
    ]).spawn();
};
