import { ByteArray, checkBytes, checkPositiveInteger } from "../types";
import { argon2id } from "@noble/hashes/argon2";

const ARGON2ID_ITERATION_COUNT: number = 3;
const ARGON2ID_MEMORY_COST: number = 65536; // 65536 KB = 64 MiB
const ARGON2ID_PARALLELISM: number = 2;

/**
 * Password Processing Function : Derives a password using Argon2id.
 *
 * @param {string} password The password to derive.
 * @param {ByteArray} salt PPF salt
 * @param {number} outputLength The length of the output key in bytes.
 * @returns {ByteArray} The derived key.
 */
function ppf(password: string, salt: ByteArray, outputLength: number = 32): ByteArray {
    checkBytes(salt);
    checkPositiveInteger(outputLength);

    return argon2id(password, salt, {
        t: ARGON2ID_ITERATION_COUNT,
        m: ARGON2ID_MEMORY_COST,
        p: ARGON2ID_PARALLELISM,
        dkLen: outputLength
    });
}

export { ppf };
