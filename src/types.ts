import { hexToBytes as nobleHexToBytes, bytesToHex as nobleBytesToHex } from "@noble/hashes/utils";

type ByteArray = Uint8Array;
type Hex = string;
type Base64 = string;

function bytesToHex(bytes: ByteArray): Hex {
    return nobleBytesToHex(bytes);
}
function hexToBytes(hex: Hex): ByteArray {
    return nobleHexToBytes(hex);
}

function bytesToBase64(bytes: ByteArray): Base64 {
    return Buffer.from(bytes).toString("base64");
}
function base64ToBytes(base64: Base64): ByteArray {
    return new Uint8Array(Buffer.from(base64, "base64"));
}

function base64ToHex(base64: Base64): Hex {
    return bytesToHex(base64ToBytes(base64));
}

function hexToBase64(hex: Hex): Base64 {
    return bytesToBase64(hexToBytes(hex));
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
    hexToBase64
};
