import { getComposeFile } from "./getComposeFile.ts";
import { getDefaultContainer } from "./getDefaultContainer.ts";
import { GenoisConfig } from "./types/GenoisConfig.ts";

const composeFile = await getComposeFile();

export const getConfig = async (): Promise<GenoisConfig> => {
    let userConfig;
    try {
        userConfig = await JSON.parse(await Deno.readTextFile(`${Deno.cwd()}/genois.json`));
    } catch (_e) {
        userConfig = undefined;
    }

    const defaultConfig: GenoisConfig = {
        main_container: getDefaultContainer(composeFile!.services!),
        env: "",
        composer_file: "docker-compose.yaml",
        aliases: {
            "": "",
        },
    }
    return userConfig ? { ...defaultConfig, ...userConfig } as GenoisConfig : defaultConfig;
};
export const config = await getConfig();
