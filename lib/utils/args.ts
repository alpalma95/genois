import { parseArgs } from "@std/cli";

const rawArgs = Deno.args;
const flagName = (flag: string) => flag?.split("=").at(0)?.replace(/-{2,}/g, "");
const controlFlags = ["name", "gn-env"];
const controlArgs = ["up", "down", "start", "stop"];
const flags = parseArgs(rawArgs);

const args = rawArgs.filter(
    (arg) => !controlFlags.includes(`${flagName(arg)}` ?? ""),
);

export { args, controlArgs, flags}