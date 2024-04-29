import { bytesToHex as nobleBytesToHex, hexToBytes as nobleHexToBytes } from "@noble/hashes/utils";
import InvalidArgumentException from "./exceptions/InvalidArgumentException";

type ByteArray = Uint8Array;
type Hex = string;
type Base64 = string;

/**
 * Converts a ByteArray to a Hex string
 *
 * @param {ByteArray} bytes Bytes to convert
 * @returns {Hex} Hex string
 */
function bytesToHex(bytes: ByteArray): Hex {
    return nobleBytesToHex(bytes);
}

/**
 * Converts a Hex string to a ByteArray
 *
 * @param {Hex} hex Hex string to convert
 * @returns {ByteArray} Bytes
 */
function hexToBytes(hex: Hex): ByteArray {
    return nobleHexToBytes(hex);
}

/**
 * Converts a ByteArray to a Base64 string
 *
 * @param {ByteArray} bytes Bytes to convert
 * @returns {Base64} Base64 string
 */
function bytesToBase64(bytes: ByteArray): Base64 {
    return Buffer.from(bytes).toString("base64");
}

/**
 * Converts a Base64 string to a ByteArray
 *
 * @param {Base64} base64 Base64 string to convert
 * @returns {ByteArray} Bytes
 */
function base64ToBytes(base64: Base64): ByteArray {
    return new Uint8Array(Buffer.from(base64, "base64"));
}

/**
 * Converts a Base64 string to a Hex string
 *
 * @param {Base64} base64 Base64 string to convert
 * @returns {Hex} Hex string
 */
function base64ToHex(base64: Base64): Hex {
    return bytesToHex(base64ToBytes(base64));
}

/**
 * Converts a Hex string to a Base64 string
 *
 * @param {Hex} hex Hex string to convert
 * @returns {Base64} Base64 string
 */
function hexToBase64(hex: Hex): Base64 {
    return bytesToBase64(hexToBytes(hex));
}

/**
 * Concatenates two ByteArrays
 *
 * @param {ByteArray} a First ByteArray
 * @param {ByteArray} b Second ByteArray
 * @returns {ByteArray} `a || b`
 */
function concatBytes(a: ByteArray, b: ByteArray): ByteArray {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
}

function checkNumber(...n: unknown[]): void {
    n.forEach((_n) => {
        if (!Number.isSafeInteger(_n)) {
            throw new InvalidArgumentException("number", _n);
        }
    });
}

function checkPositiveInteger(...n: unknown[]): void {
    n.forEach((_n) => {
        checkNumber(_n);
        if ((_n as number) < 0) {
            throw new InvalidArgumentException("positive integer", _n);
        }
    });
}

function checkBytes(...bytes: unknown[]): void {
    bytes.forEach((_bytes) => {
        if (
            !(_bytes instanceof Uint8Array) &&
            !(
                _bytes !== null &&
                typeof _bytes === "object" &&
                _bytes.constructor.name === "Uint8Array"
            )
        ) {
            throw new InvalidArgumentException("byte array", _bytes);
        }
    });
}

export {
    ByteArray,
    Hex,
    Base64,
    bytesToHex,
    hexToBytes,
    bytesToBase64,
    base64ToBytes,
    base64ToHex,
    hexToBase64,
    concatBytes,
    checkNumber,
    checkPositiveInteger,
    checkBytes
};
