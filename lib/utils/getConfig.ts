import { GenoisConfig, GenoisEnv } from "../types/App.ts";
import { basename } from "@std/path";
import { filterKeys, filterValues } from "@std/collections";
import { flags } from "./args.ts";

const defaultConfig: GenoisConfig = {
    main_container: `${basename(Deno.cwd())}-app-1`,
    env: "",
    compose_file: "",
    aliases: {
        "": "",
    },
};

const removeEmpty = (config: GenoisConfig) =>
    filterValues<string>(
        config as Record<string, string>,
        (property) => !!property,
    );

const getConfigOverride = (userConfig: GenoisConfig, overrideKey: string) => {
    const topLevelConfig = filterKeys(
        userConfig as Record<string, GenoisConfig>,
        (key: string) => key !== "genois_env",
    );
    const { genois_env = {}} = filterKeys(
        userConfig as Record<string, unknown>,
        (key: string) => key === "genois_env",
    ) as GenoisConfig;

    return removeEmpty({
        ...topLevelConfig,
        ...genois_env[overrideKey],
    });
};

export const getConfig = async (): Promise<GenoisConfig> => {
    let userConfig;
    try {
        const rawConfig = await JSON.parse(
            await Deno.readTextFile(`${Deno.cwd()}/genois.json`),
        );
        const env = flags["gn-env"] ?? "";
        userConfig = getConfigOverride(rawConfig, env);
    } catch (_e) {
        userConfig = undefined;
    }

    return (userConfig as GenoisConfig) ?? defaultConfig;
};