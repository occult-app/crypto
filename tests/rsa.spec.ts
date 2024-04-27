import { exportAsPem, generateRSAKeyPair, rsaDecrypt, rsaEncrypt } from "../src/rsa";
import { base64ToBytes, ByteArray } from "../src/types";
import DecryptionException from "../src/exceptions/DecryptionException";

describe("RSA", () => {
    const pub: ByteArray = base64ToBytes(
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi/7MWgu2nObTHZ6+k//1YsA6CkS7o9FjA1yegUPb6ZTZcTFeeL/L4b/oLZZuWC76pqsobwwxyqr8uWfd5uBerCHqsXuvda30RVgLwDSXDNzXHXhAUbWafeCypMABG6MMLbjcFSmy+15fygZOHYCpmEAM1nePWUADbQTch3YM7ZvzAZEb69IKviP49Lty30KKgUZInYu4nYsqGfhINCR6E5d6su/tVWrVCHn7eoomTh2+TR9DDpRMfKuA4PstRu4wNsTIm2QUESkTlBexEPG+nCQZETe1mXfcu/zIJ+JhdZvIDp8sgDc0YP2KllpNQQAfSvZWi59WnfSrHPrn9YQXhQIDAQAB"
    );
    const secret: ByteArray = base64ToBytes(
        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCL/sxaC7ac5tMdnr6T//ViwDoKRLuj0WMDXJ6BQ9vplNlxMV54v8vhv+gtlm5YLvqmqyhvDDHKqvy5Z93m4F6sIeqxe691rfRFWAvANJcM3NcdeEBRtZp94LKkwAEbowwtuNwVKbL7Xl/KBk4dgKmYQAzWd49ZQANtBNyHdgztm/MBkRvr0gq+I/j0u3LfQoqBRkidi7idiyoZ+Eg0JHoTl3qy7+1VatUIeft6iiZOHb5NH0MOlEx8q4Dg+y1G7jA2xMibZBQRKROUF7EQ8b6cJBkRN7WZd9y7/Mgn4mF1m8gOnyyANzRg/YqWWk1BAB9K9laLn1ad9Ksc+uf1hBeFAgMBAAECggEAFKo17AzSlfKUs0idhSdBR6RsbNucfyAHZ5WiaB5mNeKc/lJ1SYm2RMqZMTGFdErrAPM+8rVwHCSFTbEBVnVERFB1XmGNkudsqVfH1EVvDp0Cu/zmMamG9pHWjO8yuqukvpMNGaqgGu7hYObxXPWDE1BRFM9tP5VtbAhNrUlFu0UUAUIKXSZ9ISjR1P5akKWPqPTByny9HBRREKR62HCR/dJi+o/QmJJzgRneAjMceNDMrLPdAx9VmZq3ydFvZGoHtmzGaCdDuZkcAmhEWbZd5/kDBFhUNBxVf4Mw82168BQOquRGde7CICjqfHq9s2M6FMZPzbOp8Lf4U2djd5UVwQKBgQDBHrMMsDcmuOto9iwzhPzbhs752WUSkRMRS/LeMYZRlinhlLrk3U3vozILrrBgdt7wy4tTgf8hnpLIie7yF4dALF54G4AXLq5U6ZhKgtOxZ9PG6oAt1Lt8JbEGHLox7fnj61MkOl8OTGRNWEDzRcC4jb45LcPGjstMPmEvqMYWqQKBgQC5k/RZ4Qb09z//q/224nIh+LVejtdS/LZppju6pOcGZUi9qhFiOGp7jobIXXi+Kya8NnZpMs/lPvEKyJfehE9G04DO3Fwhsqpw4OXKiB4q4vFz1Cuv39HE/ZaHfeNEZOMTUntCRgYWIClkDYizojPgrdxGHmoMGy2TtKNh2NIvfQKBgFVIx22dDF4PX/bUcCS4YCpaWGFCPj56zt7emXzChjzVgd1bH0Ye7WIcweci2EVheYcBfJ/+Urt4Gf5x25ISDeqrLXUBQAn81YQuPND7AZ3g6kd4G+8heUKUKp82ZIvUOn0K2YawOHZKCimWBejpLvjRr+X0bfbr7J/ZFHZFpGUxAoGBALNHxUtDQqZLaq+EJ7KTpzE8hXMZSdnpPAxqxM82Wd3q4VAhyXN7DxvYgEt3SZtmMqCneNN+fCt7GACT82vLpI7G62xspDEF2vT7v+Nehs5lul9s/NuGva+yUMcKjhFX6auUBnHrFhwv6+y1ynfH3phTPjcbUNXrN6e3XhO8FKo9AoGAYkG2zNdPJdp8NEr/KX0RNhBna1BdG9010dx3d0Is59hMTWvHObmqbWCTISeccfFuY7tV0XzRaFa5aOl78Fs9+SvDya2OXWaR1SW78xC255+diBMRNee887hCKKKoi5C5uBk7n6PRamrvSnahGWlrPRO6Cl+wYMFcezNrSakCwFA="
    );
    const data: ByteArray = base64ToBytes("c2VjdXJpdHk=");

    it("should generate a key pair", async () => {
        const keyPair = await generateRSAKeyPair();

        expect(keyPair.secret.length).toBeGreaterThan(1000);
        expect(keyPair.pub.length).toBeGreaterThan(200);
    });

    it("should export keys", () => {
        const publicPem = exportAsPem(pub, "PUBLIC");
        const secretPem = exportAsPem(secret, "SECRET");

        expect(publicPem).toMatch(/^-----BEGIN PUBLIC KEY-----[\s\w/+=]+-----END PUBLIC KEY-----$/);
        expect(secretPem).toMatch(
            /^-----BEGIN RSA PRIVATE KEY-----[\s\w/+=]+-----END RSA PRIVATE KEY-----$/
        );
    });

    it("should encrypt and decrypt data", async () => {
        const cipher: ByteArray = await rsaEncrypt(pub, data);
        const decryptedData: ByteArray = await rsaDecrypt(secret, cipher);

        expect(decryptedData).toEqual(data);
    });

    it("should not be able to decrypt data", async () => {
        const cipher: ByteArray = await rsaEncrypt(pub, data);
        const wrongKeyPair = await generateRSAKeyPair();

        await expect(async () => await rsaDecrypt(wrongKeyPair.secret, cipher)).rejects.toThrow(
            DecryptionException
        );
    });
});
