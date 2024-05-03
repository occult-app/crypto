import { ByteArray, checkBytes } from "../types";

/**
 * Computes the HMAC-SHA256 tag (hash) of the input data using the provided key.
 *
 * @param {ByteArray} key The key used for HMAC computation.
 * @param {ByteArray} input The input data for which HMAC tag is computed.
 * @returns {Promise<ByteArray>} The computed tag.
 */
async function hmac(key: ByteArray, input: ByteArray): Promise<ByteArray> {
    checkBytes(key, input);

    const importedKey = await window.crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const tag = await window.crypto.subtle.sign("HMAC", importedKey, input);

    return new Uint8Array(tag);
}

export { hmac };
