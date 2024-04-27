import { ByteArray } from "../types";
import { ed25519 } from "@noble/curves/ed25519";

interface KeyPair {
    pub: ByteArray;
    secret: ByteArray;
}

/**
 * Generates a pair of Ed25519 keys.
 *
 * @returns A Ed25519 key pair.
 */
function generateEd25519KeyPair(): KeyPair {
    const secret: ByteArray = ed25519.utils.randomPrivateKey();
    return {
        pub: ed25519.getPublicKey(secret),
        secret: secret
    };
}

/**
 * Signs the provided data using the given secret key.
 *
 * @param secret The secret key used for signing.
 * @param data The data to be signed.
 * @returns The signature of the data.
 */
function sign(secret: ByteArray, data: ByteArray): ByteArray {
    return ed25519.sign(data, secret);
}

/**
 * Verifies the signature of the provided data using the given public key.
 *
 * @param pub The public key used for verification.
 * @param signature The signature to be verified.
 * @param data The data whose signature is to be verified.
 * @returns A boolean indicating whether the signature is valid.
 */
function verify(pub: ByteArray, signature: ByteArray, data: ByteArray): boolean {
    return ed25519.verify(signature, data, pub);
}

export { generateEd25519KeyPair, sign, verify };
