import {
    Base64,
    base64ToBytes,
    base64ToHex,
    ByteArray,
    bytesToBase64,
    bytesToHex,
    checkBytes,
    checkNumber,
    checkPositiveInteger,
    concatBytes,
    Hex,
    hexToBase64,
    hexToBytes
} from "../src/types";
import InvalidArgumentException from "../src/exceptions/InvalidArgumentException";

describe("Type conversion", () => {
    const bytes: ByteArray = new Uint8Array([
        153, 194, 234, 222, 14, 62, 105, 17, 91, 250, 170, 20, 215, 119, 157, 149
    ]);
    const hex: Hex = "99c2eade0e3e69115bfaaa14d7779d95";
    const base64: Base64 = "mcLq3g4+aRFb+qoU13edlQ==";

    it("should convert ByteArray to Hex", () => {
        expect(bytesToHex(bytes)).toStrictEqual(hex);
    });

    it("should convert Hex to ByteArray", () => {
        expect(hexToBytes(hex)).toStrictEqual(bytes);
    });

    it("should convert ByteArray to Base64", () => {
        expect(bytesToBase64(bytes)).toStrictEqual(base64);
    });

    it("should convert Base64 to ByteArray", () => {
        expect(base64ToBytes(base64)).toStrictEqual(bytes);
    });

    it("should convert Base64 to Hex", () => {
        expect(base64ToHex(base64)).toStrictEqual(hex);
    });

    it("should convert Hex to Base64", () => {
        expect(hexToBase64(hex)).toStrictEqual(base64);
    });
});

describe("Type operations", () => {
    it("should concatenate byte arrays", () => {
        const a: ByteArray = new Uint8Array([0, 1, 2]);
        const b: ByteArray = new Uint8Array([3, 4]);

        const c: ByteArray = concatBytes(a, b);

        expect(c).toEqual(new Uint8Array([0, 1, 2, 3, 4]));
    });
});

describe("Type checking", () => {
    it("should verify number", () => {
        expect(() => checkNumber(42)).not.toThrow(InvalidArgumentException);
    });

    it("should not verify number", () => {
        expect(() => checkNumber("hello")).toThrow(InvalidArgumentException);
    });

    it("should verify positive integer", () => {
        expect(() => checkPositiveInteger(42)).not.toThrow(InvalidArgumentException);
    });

    it("should not verify positive integer", () => {
        expect(() => checkPositiveInteger(-1)).toThrow(InvalidArgumentException);
    });

    it("should verify ByteArray", () => {
        expect(() => checkBytes(new Uint8Array([0, 1, 2]))).not.toThrow(InvalidArgumentException);
        expect(() => checkBytes(new Uint8Array([]))).not.toThrow(InvalidArgumentException);
    });

    it("should not verify ByteArray", () => {
        expect(() => checkBytes("deadbeef")).toThrow(InvalidArgumentException);
        expect(() => checkBytes(null)).toThrow(InvalidArgumentException);
        expect(() => checkBytes([])).toThrow(InvalidArgumentException);
    });
});
