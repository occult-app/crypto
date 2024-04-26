import { randomBytes } from "../src/random";
import { ByteArray } from "../src/types";

describe("CSPRNG", () => {
    it("should return a random number", async () => {
        const randomArray: ByteArray = await randomBytes(1000);
        expect(randomArray.length).toEqual(1000);
        randomArray.forEach((byte) => {
            expect(byte).toBeLessThanOrEqual(255);
            expect(byte).toBeGreaterThanOrEqual(0);
        });
    });
});
