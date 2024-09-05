import { args, controlArgs } from "./utils/args.ts";
import {  control, defaultRun } from "./commands/index.ts";
import { Command } from "./utils/Command.ts";

Command(
    () => controlArgs.includes(args[0]),
    () => control(),
);

Command(
    () => true,
    () => defaultRun(),
);
