import { ByteArray, bytesToHex } from "../../src/types";
import { sha256, sha512 } from "../../src/operations/sha2";

describe("SHA2", () => {
    const input: string = "hash me!";

    it("should compute the SHA-256 hash", async () => {
        const hash: ByteArray = await sha256(input);
        expect(hash.length).toEqual(32);
        expect(bytesToHex(hash)).toEqual(
            "f1df4a6d8659471333f7f6470d593e0911b4d487856d88c83d2d187afa195927"
        );
    });

    it("should compute the SHA-512 hash", async () => {
        const hash: ByteArray = await sha512(input);
        expect(hash.length).toEqual(64);
        expect(bytesToHex(hash)).toEqual(
            "3b20c1f6b69e9087e8df6ca856c43f752ba005e29d8fe0de2c20f12d456cfaf63dc4717a7c3e9c5da7166dcf2e932f62a47f113325553a0908883c190859b0c3"
        );
    });
});
