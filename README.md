# Génois
## CLI tool to simplfy local docker development

WIP

## Default configuration (putting here some random thoughts so I don't forget hehe)

- We assume the name of the running container is called `<project_name>-app-1`
- We don't assume any default docker-compose file

To override these defaults, add a `genois.json` file to the root of your project.

```json
{   
    "main_container": "deno-app", // This will look for a running container with this name
    "env": "", // It's ok to leave it empty, if none is specified it'll default to docker's behaviour (that is, looking for a .env file if it exists)
    "compose_file": "docker-compose.prod.yaml", // Default docker-compose file to be used for the up command
    "aliases": { // Aliases we can use inside the container, kind of like a package.json script
        "v": "deno --version",
        "dev": "deno run --allow-all ./lib/main.ts"
    },
    "genois_env": { // genois up --gn-env=dev will override the config specified above while the container is running
        "dev": {
            "main_container": "deno-app",
            "compose_file": "docker-compose.yaml",
            "aliases": {
                "v" : "deno --version"
            }
        },
        "prod": {
            "compose_file": "docker-compose.yaml"
        }
    }
}
