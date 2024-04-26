import { randomNumber } from "../src/random";

describe("Some test", () => {
    it("should return true", () => {
        expect(true).toBeTruthy();
    });

    it("should return a random number between 0 and 1000", () => {
        const n = randomNumber();
        expect(n).toBeGreaterThan(0);
        expect(n).toBeLessThan(1000);
    });
});
