export const createCommand = (command: string, args: string[]): Deno.Command => {
    return new Deno.Command(command, { args });
};