export default class InvalidArgumentException extends Error {
    constructor(type: string, value: unknown) {
        super(
            `Invalid argument type. Expected an instance of ${type}, got ${typeof value} (${value}) instead`
        );
    }
}
