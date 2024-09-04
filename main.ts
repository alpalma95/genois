import { createYaml } from "./lib/createYaml.ts";
import { createCommand } from "./lib/createCommand.ts";
import { match } from "./lib/match.ts";
import { args, controlArgs, flags } from "./lib/args.ts";
import { getComposeFile } from "./lib/getComposeFile.ts";
import { getDefaultContainer } from "./lib/getDefaultContainer.ts";

const main = async () => {
    const composeFile = await getComposeFile();
    if (!composeFile) return;
    const services = composeFile.services!;
    
    const defaultContainerName = getDefaultContainer(services);

    if (!defaultContainerName) {
        console.log(
            "❌  %cYour services should have a container_name or a build property specified.",
            "color: black; background-color: red; font-weight: bold",
        );
        return;
    };

    match<void>(
        [
            controlArgs.includes(args[0]),
            () => createCommand("docker-compose", [...args]).spawn(),
        ],
        [
            args[0].toLowerCase() === "compose",
            async () => await createYaml(),
        ],
        [
            flags.name,
            () =>
                createCommand("docker", ["exec", "-it", flags.name, ...args])
                    .spawn(),
        ],
        [
            true,
            () =>
                createCommand("docker", [
                    "exec",
                    "-it",
                    defaultContainerName,
                    ...args,
                ]).spawn(),
        ],
    );
};

main();
