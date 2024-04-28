import { ByteArray } from "../types";

type Algorithm = "SHA-256" | "SHA-512";

async function sha2(input: ByteArray, algorithm: Algorithm): Promise<ByteArray> {
    return new Uint8Array(await window.crypto.subtle.digest(algorithm, input));
}

/**
 * Computes the SHA-256 hash of the input data.
 *
 * @param {ByteArray} input The input data for which SHA-256 hash is computed.
 * @returns {Promise<ByteArray>} The computed SHA-256 hash.
 */
async function sha256(input: ByteArray): Promise<ByteArray> {
    return await sha2(input, "SHA-256");
}

/**
 * Computes the SHA-512 hash of the input data.
 *
 * @param {ByteArray} input The input data for which SHA-512 hash is computed.
 * @returns {Promise<ByteArray>} The computed SHA-512 hash.
 */
async function sha512(input: ByteArray): Promise<ByteArray> {
    return await sha2(input, "SHA-512");
}

export { sha256, sha512 };
