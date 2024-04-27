import { ByteArray } from "../types";

type Algorithm = "SHA-256" | "SHA-512";

async function sha2(input: ByteArray, algorithm: Algorithm): Promise<ByteArray> {
    return new Uint8Array(await window.crypto.subtle.digest(algorithm, input));
}

async function sha256(input: ByteArray): Promise<ByteArray> {
    return await sha2(input, "SHA-256");
}

async function sha512(input: ByteArray): Promise<ByteArray> {
    return await sha2(input, "SHA-512");
}

export { sha256, sha512 };
