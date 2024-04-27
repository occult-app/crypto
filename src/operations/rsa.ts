import { ByteArray, bytesToBase64 } from "../types";
import DecryptionException from "../exceptions/DecryptionException";

interface KeyPair {
    pub: ByteArray;
    secret: ByteArray;
}

/**
 * Generates a pair of RSA keys.
 *
 * @returns An RSA key pair.
 */
async function generateRSAKeyPair(): Promise<KeyPair> {
    const cryptoKeyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" }
        },
        true,
        ["encrypt", "decrypt"]
    );

    const pub: ByteArray = new Uint8Array(
        await window.crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey)
    );
    const secret: ByteArray = new Uint8Array(
        await window.crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey)
    );

    return { pub, secret };
}

/**
 * Exports the given RSA key as PEM format.
 *
 * @param key The key to be exported.
 * @param keyType The type of the key ("PUBLIC" for public key, "SECRET" for private key).
 * @returns The RSA key in PEM format.
 */
function exportAsPem(key: ByteArray, keyType: "PUBLIC" | "SECRET"): string {
    const base64Key = bytesToBase64(new Uint8Array(key));
    return `-----BEGIN ${keyType == "PUBLIC" ? "PUBLIC" : "RSA PRIVATE"} KEY-----\n${base64Key}\n-----END ${keyType == "PUBLIC" ? "PUBLIC" : "RSA PRIVATE"} KEY-----`;
}

/**
 * Encrypts the given data using the provided RSA public key.
 *
 * @param pub The RSA public key used for encryption.
 * @param data The data to be encrypted.
 * @returns The encrypted data.
 */
async function rsaEncrypt(pub: ByteArray, data: ByteArray): Promise<ByteArray> {
    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        pub,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );

    const encryptedData = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data);

    return new Uint8Array(encryptedData);
}

/**
 * Decrypts the given cipher using the provided RSA private key.
 *
 * @param secret The RSA private key used for decryption.
 * @param cipher The ciphered data to be decrypted.
 * @returns The decrypted data.
 */
async function rsaDecrypt(secret: ByteArray, cipher: ByteArray): Promise<ByteArray> {
    try {
        const privateKey = await window.crypto.subtle.importKey(
            "pkcs8",
            secret,
            { name: "RSA-OAEP", hash: "SHA-256" },
            true,
            ["decrypt"]
        );

        const decryptedData = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            cipher
        );

        return new Uint8Array(decryptedData);
    } catch (error) {
        throw new DecryptionException(error);
    }
}

export { generateRSAKeyPair, exportAsPem, rsaEncrypt, rsaDecrypt };
