import sha256 from "crypto-js/sha256";

export default class Transaction {
  private timestamp: number = -1;
  /**
   * Creates a new Transation
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {number} amount
   * @param {number} timestamp
   */
  constructor(
    public fromAddress: string,
    public toAddress: string,
    public amount: number
  ) {
    this.timestamp = Date.now();
  }

  /**
   * Creates a SHA256 hash of the current Transaction
   *
   * @return {string} hash
   */
  calculateHash(): string {
    return sha256(this.fromAddress + this.toAddress + this.amount).toString();
  }
}
