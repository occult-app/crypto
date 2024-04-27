import { ByteArray } from "../types";

interface KDFContext {
    info: string;
    version: number;
}

function contextToBuffer(context: KDFContext): Buffer {
    const infoBuffer: Buffer = Buffer.from(context.info);
    const versionBuffer: Buffer = Buffer.alloc(1);
    versionBuffer.writeUInt8(context.version);
    return Buffer.concat([infoBuffer, versionBuffer]);
}

/**
 * Performs HKDF (HMAC-based Key Derivation Function)
 *
 * @param key The input key material.
 * @param context The HKDF context containing information such as info string and version.
 * @param outputLength The length of the output key material in bytes.
 * @param salt (Optional) Salt to use during key extraction.
 * @returns The derived key material.
 */
async function kdf(
    key: ByteArray,
    context: KDFContext,
    outputLength: number,
    salt: ByteArray | null = null
): Promise<ByteArray> {
    const extractKey = await window.crypto.subtle.importKey("raw", key, { name: "HKDF" }, false, [
        "deriveKey",
        "deriveBits"
    ]);

    const contextBuffer = contextToBuffer(context);
    const saltBuffer = Buffer.from(salt ?? []);

    const derived = await window.crypto.subtle.deriveBits(
        {
            name: "HKDF",
            info: contextBuffer,
            salt: saltBuffer,
            hash: "SHA-256"
        },
        extractKey,
        outputLength * 8
    );

    return new Uint8Array(derived);
}

export { kdf };
