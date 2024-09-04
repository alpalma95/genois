import { ComposeSpecification } from "./types/ComposeSpecification.ts";
import { parse } from "@std/yaml";
import { createYaml } from "./createYaml.ts";

export const getComposeFile = async (): Promise<ComposeSpecification | null> => {
    let composeFile: ComposeSpecification | null;

    try {
        composeFile = parse(
            await Deno.readTextFile(`${Deno.cwd()}/docker-compose.yaml`),
        ) as ComposeSpecification;
    } catch (_e) {
        const status = await createYaml();
        status === 'ok' ? composeFile = await getComposeFile() : composeFile = null;
    }

    return composeFile;
};