import { stringify } from "@std/yaml";
import type { ComposeSpecification } from "./types/ComposeSpecification.ts";


export const createYaml = async (): Promise<'ok' | 'ko'> => {
    let config: ComposeSpecification;

    try {
        config = (await import("../genois.compose.ts")).default;
    } catch (_) { 
        console.log("❌  %cNo genois.compose.ts file found.", "color: black; background-color: red; font-weight: bold");
        return 'ko';
    }
    const yaml = stringify(config);
    await Deno.writeTextFile("docker-compose.yaml", yaml);
    return 'ok';
};