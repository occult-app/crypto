import { ByteArray, bytesToHex, hexToBytes } from "../../src/types";
import { hmac } from "../../src/operations/hmac";

describe("HMAC", () => {
    it("should compute the HMAC-SHA256 hash", async () => {
        const key: ByteArray = new Uint8Array([
            108, 169, 151, 124, 154, 55, 16, 255, 152, 230, 112, 0, 136, 80, 171, 197, 35, 79, 55,
            37, 161, 144, 41, 184, 148, 82, 137, 236, 132, 147, 213, 9
        ]);

        const tag: ByteArray = await hmac(key, hexToBytes("deadbeef"));

        expect(bytesToHex(tag)).toEqual(
            "e17dec46db65352eb08841a383eaee78b234e3396fa035a5e2359abea0aa4d72"
        );
    });
});
