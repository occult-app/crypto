export default class DecryptionException extends Error {
    constructor(error: unknown) {
        super(`Failed to decrypt data.\nDetails:\n\t:${error}`);
    }
}
