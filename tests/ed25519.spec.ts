import { ByteArray, hexToBytes } from "../src/types";
import { generateEd25519KeyPair, sign, verify } from "../src/ed25519";

describe("Ed25519", () => {
    const secret: ByteArray = hexToBytes(
        "c08e255aa6b1db4e5e01880f92d06ffe31b15eb2158ff1cc2586584a9865fbe8"
    );
    const pub: ByteArray = hexToBytes(
        "f40777b2df4430947af2d5670cbffe00ab566a223021e80b9f7cd3eb05f1c499"
    );
    const data: ByteArray = hexToBytes("deadbeef");
    const signature: ByteArray = hexToBytes(
        "7aa9ffe8f5381004fa274fc2fd790573428f7b2c3730450378beb834fdfda4bceacc4a17347a9c11920378e96c7de26771cab71ab662e4af1ba4e8dae924ec0a"
    );

    it("should generate a key pair", () => {
        const keyPair = generateEd25519KeyPair();

        expect(keyPair.secret.length).toBe(32);
        expect(keyPair.pub.length).toBe(32);
    });

    it("should sign data", () => {
        const computedSig = sign(secret, data);

        expect(computedSig).toEqual(signature);
    });

    it("should verify the signature", () => {
        expect(verify(pub, signature, data)).toBe(true);
    });

    it("should not verify the signature", () => {
        const fakeSignature: ByteArray = hexToBytes(
            "7aa9ffe8f5381004fa274fc2fd790573428f7b2c3730450378beb834fdfda4bceacc4a17347a9c11920378e96c7de26771cab71ab662e4af1ba4e8dae924ec0b"
        );
        expect(verify(pub, fakeSignature, data)).toBe(false);
    });
});
