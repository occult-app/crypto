import { ByteArray, checkBytes } from "../types";
import DecryptionException from "../exceptions/DecryptionException";

/**
 * Encrypts the given data using AES-GCM.
 *
 * @param {ByteArray} key The encryption key.
 * @param {ByteArray} iv The initialisation vector.
 * @param {ByteArray} data The data to be encrypted.
 * @returns {Promise<ByteArray>} The encrypted data.
 */
async function aesEncrypt(key: ByteArray, iv: ByteArray, data: ByteArray): Promise<ByteArray> {
    checkBytes(key, iv, data);

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
 * @param {ByteArray} key The encryption key.
 * @param {ByteArray} iv The initialisation vector.
 * @param {ByteArray} cipher The ciphered data to be decrypted.
 * @returns {Promise<ByteArray>} The decrypted data.
 * @throws {DecryptionException} Throws DecryptionException if data cannot be decrypted.
 */
async function aesDecrypt(key: ByteArray, iv: ByteArray, cipher: ByteArray): Promise<ByteArray> {
    checkBytes(key, iv, cipher);

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
