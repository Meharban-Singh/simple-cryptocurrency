import * as crypto from "crypto";
import { hash } from "./types";
import { Wallet } from "./Wallet";

export default class Transaction {
  public timestamp: number = -1;
  public signature: any = null;
  /**
   * Creates a new Transation
   *
   * @param {hash} fromAddress
   * @param {hash} toAddress
   * @param {number} timestamp
   */
  constructor(
    public fromAddress: hash,
    public toAddress: hash,
    public amount: number
  ) {
    this.timestamp = Date.now();
  }

  /**
   * Creates a SHA256 hash of the current Transaction
   *
   * @return {hash} hash
   */
  calculateHash(): hash {
    const str = JSON.stringify(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    );
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    return hash.digest("hex");
  }

  /**
   * Signs a transaction with the given wallet
   *
   * @param {Wallet} wallet
   */
  sign(wallet: Wallet) {
    // Check to make sure you can only sign your transactions
    if (wallet.publicKey !== this.fromAddress)
      throw new Error("You cannot sign transactions for other wallets!");

    // create signature
    const sign = crypto.createSign("SHA256");
    sign.update(this.calculateHash());
    sign.end();

    this.signature = sign.sign(wallet.privateKey);
  }

  /**
   * Checks if the transaction is valid.
   *
   * @returns {boolean}
   */
  isValid(): boolean {
    if (!this.fromAddress || !this.toAddress) {
      console.error("Transaction must include from and to address");
      return false;
    }

    if (this.amount <= 0) {
      console.error("Tsx invalid amount");
      return false;
    }
    // Transaction not signed
    if (
      !this.signature ||
      this.signature.length === 0 ||
      this.signature === null
    )
      throw new Error("No signature in this transaction");

    // Signature matches
    const verify = crypto.createVerify("SHA256");
    verify.update(this.calculateHash());
    verify.end();
    return verify.verify(this.fromAddress, this.signature);
  }
}
