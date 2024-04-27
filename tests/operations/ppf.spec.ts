import { ppf } from "../../src/operations/ppf";
import { ByteArray, bytesToHex } from "../../src/types";

describe("Password Processing Function", () => {
    const password: string = "SuperS3cret!";
    const salt: ByteArray = new Uint8Array([
        121, 242, 146, 172, 41, 234, 112, 205, 222, 96, 195, 136, 193, 80, 218, 41, 123, 174, 77,
        21, 34, 42, 99, 51, 122, 60, 188, 65, 213, 142, 189, 132
    ]);

    it("should compute the Argon2id hash", () => {
        const derivedPassword: ByteArray = ppf(password, salt);

        expect(bytesToHex(derivedPassword)).toEqual(
            "3482e8e7e70165709a15a690d8a6a3312ae0ea5e645f9be767b7e68aa3bead61"
        );
    });

    it("should compute the Argon2id hash (512 bits)", () => {
        const derivedPassword: ByteArray = ppf(password, salt, 64);

        expect(bytesToHex(derivedPassword)).toEqual(
            "ab2c298ec6e0f1e87d79ba4b43b96daa3e53350d4631983306050507d690053b162c2067b6c6bfd1601cf8b33081464647d5ec817c810af44aa0c68d7b3a40c3"
        );
    });
});
