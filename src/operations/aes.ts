import { ByteArray } from "../types";
import DecryptionException from "../exceptions/DecryptionException";

/**
 * Encrypts the given data using AES-GCM.
 *
 * @param key The encryption key.
 * @param iv The initialisation vector.
 * @param data The data to be encrypted.
 * @returns The encrypted data.
 */
async function aesEncrypt(key: ByteArray, iv: ByteArray, data: ByteArray): Promise<ByteArray> {
    const cryptoKey = await window.crypto.subtle.importKey("raw", key, { name: "AES-GCM" }, false, [
        "encrypt"
    ]);

    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        cryptoKey,
        data
    );
    return new Uint8Array(encryptedData);
}

/**
 * Decrypts the given cipher using AES-GCM.
 *
 * @param key The encryption key.
 * @param iv The initialisation vector.
 * @param cipher The ciphered data to be decrypted.
 * @returns The decrypted data.
 */
async function aesDecrypt(key: ByteArray, iv: ByteArray, cipher: ByteArray): Promise<ByteArray> {
    try {
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            key,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        const decryptedData = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            cryptoKey,
            cipher
        );
        return new Uint8Array(decryptedData);
    } catch (error) {
        throw new DecryptionException(error);
    }
}

export { aesEncrypt, aesDecrypt };
