import { ByteArray, concatBytes, hexToBytes } from "../../src/types";
import { aesDecrypt, aesEncrypt } from "../../src/operations/aes";
import DecryptionException from "../../src/exceptions/DecryptionException";

describe("AES", () => {
    const data: ByteArray = hexToBytes("deadbeef");
    const cipher: ByteArray = hexToBytes("6ee80408");
    const tag: ByteArray = hexToBytes("9b0342f8afebf9587de47a3d49f9fb4f");
    const key: ByteArray = new Uint8Array([
        108, 169, 151, 124, 154, 55, 16, 255, 152, 230, 112, 0, 136, 80, 171, 197, 35, 79, 55, 37,
        161, 144, 41, 184, 148, 82, 137, 236, 132, 147, 213, 9
    ]);
    const iv: ByteArray = new Uint8Array([15, 159, 45, 117, 49, 60, 208, 160, 227, 123, 126, 22]);

    it("should encrypt data", async () => {
        const computedCipher = await aesEncrypt(key, iv, data);

        expect(computedCipher).toEqual(concatBytes(cipher, tag));
    });

    it("should decrypt data", async () => {
        const decryptedData = await aesDecrypt(key, iv, concatBytes(cipher, tag));

        expect(decryptedData).toEqual(data);
    });

    it("should not decrypt data (bad cipher)", async () => {
        const badCipher = hexToBytes("6ee80409");

        await expect(
            async () => await aesDecrypt(key, iv, concatBytes(badCipher, tag))
        ).rejects.toThrow(DecryptionException);
    });

    it("should not decrypt data (bad tag)", async () => {
        const badTag = hexToBytes("9b0342f8afebf9587de47a3d49f9fb4d");

        await expect(
            async () => await aesDecrypt(key, iv, concatBytes(cipher, badTag))
        ).rejects.toThrow(DecryptionException);
    });
});
