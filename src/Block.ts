import Transaction from "./Transaction";
import { hash } from "./types";
import sha256 from "crypto-js/sha256";

export default class Block {
  private nonce: number = 0; // some random number to change hash to increase mining difficulty and hence security
  public hash: hash = "";

  /**
   * Creates a new Block
   *
   * @param {Transaction} transaction
   * @param {hash} previousHash
   */
  constructor(public transaction: Transaction, public previousHash: hash) {
    this.previousHash = previousHash;
    this.transaction = transaction;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  /**
   * Calcuates and returns the hash for the block
   *
   * @return {hash} hash
   */
  calculateHash(): hash {
    return sha256(
      this.transaction.toString() + this.previousHash + this.nonce
    ).toString();
  }

  /**
   * Starts mining the block with a certain difficulty.
   *
   * @param {number} difficulty
   */
  mine(difficulty: number) {
    // Until the hash starts with n zeros, a new hash is created, so it takes more time
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++; // nonce needed to update the hash
      this.hash = this.calculateHash();
    }

    console.debug(`Block mined: ${this.hash}`);
  }

  /**
   * Returns true if the block is valid
   *
   * @return {boolean}
   */
  isValid() {
    if (this.transaction === null) return false;

    if (this.calculateHash() !== this.hash) return false;

    return this.transaction.isValid();
  }
}
