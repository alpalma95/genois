import { match } from "./lib/match.ts";
import { args, controlArgs, flags } from "./lib/args.ts";
import { compose } from "./lib/commands/compose.ts";
import { control } from "./lib/commands/control.ts";
import { flag } from "./lib/commands/flag.ts";
import { defaultRun } from "./lib/commands/defaultRun.ts";

const main = (): void => {
    match<void>(
        [
            controlArgs.includes(args[0]),
            () => control(),
        ],
        [
            args[0].toLowerCase() === "compose",
            async () => await compose(),
        ],
        [
            flags.name,
            () => flag(),
        ],
        [
            true,
            () => defaultRun(),
        ],
    );
};

main();
