import { ByteArray } from "../types";
import { argon2id } from "@noble/hashes/argon2";

const ARGON2ID_ITERATION_COUNT: number = 3;
const ARGON2ID_MEMORY_COST: number = 65536; // 65536 KB = 64 MiB
const ARGON2ID_PARALLELISM: number = 2;

/**
 * Password Processing Function : Derives a password using Argon2id.
 *
 * @param password The password to derive.
 * @param salt PPF salt
 * @param outputLength The length of the output key in bytes.
 * @returns The derived key.
 */
function ppf(password: string, salt: ByteArray, outputLength: number = 32): ByteArray {
    return argon2id(password, salt, {
        t: ARGON2ID_ITERATION_COUNT,
        m: ARGON2ID_MEMORY_COST,
        p: ARGON2ID_PARALLELISM,
        dkLen: outputLength
    });
}

export { ppf };
