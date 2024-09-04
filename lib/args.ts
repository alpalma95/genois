import { parseArgs } from "@std/cli";

const rawArgs = Deno.args;
const flagName = (flag: string) => flag?.replaceAll("-", "").split("=").at(0);
const controlFlags = ["name"];
const controlArgs = ["up", "down", "start", "stop"];
const flags = parseArgs(rawArgs);

const args = rawArgs.filter(
    (arg) => !controlFlags.includes(flagName(arg) ?? ""),
);

export { args, controlArgs, flags}