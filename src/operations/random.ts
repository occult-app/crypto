import { ByteArray } from "../types";

/**
 * Generates cryptographically secure random bytes using the Web Crypto API.
 *
 * @param {number} length The number of random bytes to generate.
 * @returns {Promise<ByteArray>} ByteArray containing the generated random bytes.
 */
async function randomBytes(length: number): Promise<ByteArray> {
    return crypto.getRandomValues(new Uint8Array(length));
}

export { randomBytes };
