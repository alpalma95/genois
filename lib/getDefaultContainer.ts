import { basename } from "@std/path";
import { PropertiesServices } from "./types.ts";

export const getDefaultContainer = (services: PropertiesServices): string => {
    const currentDir = basename(Deno.cwd());
    // We assume that the dev image(s) must have a build property specified
    const servicesWithBuild: string[] = Object.keys(services).filter((key) =>
        services[key]["build"]
    );

    if (!servicesWithBuild.length) return '';

    const defaultService = servicesWithBuild.at(0);

    return services[defaultService!]['container_name'] ?? `${currentDir}-${defaultService}-1`;

};
