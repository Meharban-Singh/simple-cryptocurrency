import sha256 from "crypto-js/sha256";
import { hash } from "./types";

export default class Transaction {
  private timestamp: number = -1;
  /**
   * Creates a new Transation
   *
   * @param {hash} fromAddress
   * @param {hash} toAddress
   * @param {number} amount
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
    return sha256(this.fromAddress + this.toAddress + this.amount).toString();
  }
}
