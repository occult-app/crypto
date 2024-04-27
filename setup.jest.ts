import { Crypto } from "@peculiar/webcrypto";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

const crypto = new Crypto();

Object.defineProperty(global.self, "crypto", {
    value: {
        subtle: crypto.subtle,
        getRandomValues: crypto.getRandomValues
    },
});
