let matched: boolean = false;

export const Command = <T>(condition: () => boolean, cb: () => T): void => {
    if (condition() && !matched) {
        cb();
        matched = true;
    }
}