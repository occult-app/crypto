import { ByteArray } from "../types";

/**
 * Generates cryptographically secure random bytes using the Web Crypto API.
 *
 * @param length The number of random bytes to generate.
 * @returns A Promise that resolves to a ByteArray containing the generated random bytes.
 * @throws {Error} Thrown if the Web Crypto API is not available.
 */
async function randomBytes(length: number): Promise<ByteArray> {
    if (crypto && typeof crypto.getRandomValues === "function") {
        return crypto.getRandomValues(new Uint8Array(length));
    }
    throw new Error("crypto.getRandomValues is not defined.");
}

export { randomBytes };
