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
   * @param {number} timestamp
   * @param {hash} previousHash
   */
  constructor(
    public transaction: Transaction,
    public timestamp: number,
    public previousHash: hash
  ) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
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
      this.transaction.toString() +
        this.timestamp +
        this.previousHash +
        this.nonce
    ).toString();
  }

  /**
   * Starts mining the block with a certain difficulty.
   *
   * @param {number} difficulty
   */
  mineBlock(difficulty: number) {
    // Until the hash starts with n zeros, a new hash is created, so it takes more time
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++; // nonce needed to update the hash
      this.hash = this.calculateHash();
    }

    console.debug(`Block mined: ${this.hash}`);
  }
}
