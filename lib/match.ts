export type condition<T> = [boolean, () => T ]

export const match = <T>(...conditions: condition<T>[]): T | undefined => {
    for (const [condition, action] of conditions) {
        if (condition) {
            return action();
        }
    }
}