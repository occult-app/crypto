import { ByteArray } from "./types";
import { createHash, Hash } from "crypto";

type Algorithm = "SHA-256" | "SHA-512";

function sha2(input: string, algorithm: Algorithm): ByteArray {
    const hash: Hash = createHash(algorithm);
    hash.update(input);
    return new Uint8Array(hash.digest());
}

function sha256(input: string): ByteArray {
    return sha2(input, "SHA-256");
}

function sha512(input: string): ByteArray {
    return sha2(input, "SHA-512");
}

export { sha256, sha512 };
