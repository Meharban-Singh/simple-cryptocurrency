const { generateKeyPairSync } = require("crypto");

export function generateKey() {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 512,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "top secret",
    },
  });

  return { publicKey, privateKey };
}
