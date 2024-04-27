import { ByteArray, bytesToHex } from "../src/types";
import { kdf } from "../src/kdf";

describe("KDF", () => {
    const key: ByteArray = new Uint8Array([
        108, 169, 151, 124, 154, 55, 16, 255, 152, 230, 112, 0, 136, 80, 171, 197, 35, 79, 55, 37,
        161, 144, 41, 184, 148, 82, 137, 236, 132, 147, 213, 9
    ]);

    it("should derive a key", async () => {
        const derivedKey: ByteArray = await kdf(key, { info: "TEST", version: 0 }, 64);

        expect(bytesToHex(derivedKey)).toEqual(
            "87376bc7b208c956964517c655ce5d66bc619c85995840450c55112bdcec335ce48580f6f48deaf2b9e2deefe9be984b1519e95b6cddb4637870c7c2217a5f14"
        );
    });

    it("should derive a key using a salt", async () => {
        const salt: ByteArray = new Uint8Array([
            121, 242, 146, 172, 41, 234, 112, 205, 222, 96, 195, 136, 193, 80, 218, 41, 123, 174,
            77, 21, 34, 42, 99, 51, 122, 60, 188, 65, 213, 142, 189, 132
        ]);

        const derivedKey: ByteArray = await kdf(
            key,
            { info: "TEST", version: 0 },
            key.length,
            salt
        );

        expect(bytesToHex(derivedKey)).toEqual(
            "cf69f35ca95289721d64e1a00708bb100ff5eb2155acda2540fab9e8c3386dd0"
        );
    });
});
