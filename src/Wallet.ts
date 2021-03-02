import { generateKey } from "./keyGen";
import Transaction from "./Transaction";

export class Wallet {
  private _publicKey: string = "";
  private _privateKey: string = "";

  /**
   * Creates a new Wallet
   */
  constructor() {
    const newKeyGen = generateKey();
    this._publicKey = newKeyGen.publicKey;
    this._privateKey = newKeyGen.privateKey;
  }

  /**
   * Returns the private key of the wallet
   *
   * @return {string} private key
   */
  get privateKey(): string {
    return this._privateKey;
  }

  /**
   * Returns the public key of the wallet
   *
   * @return {string} public key
   */
  get publicKey(): string {
    return this._publicKey;
  }

  /**
   * Sends money to a public key addr
   *
   * @param {number} amount
   * @param {string} to Address to be sent
   */
  transfer(amount: number, to: string) {
    if (to === this.publicKey)
      throw new Error("You cannot send the money to yourself.");

    const transaction: Transaction = new Transaction(
      this.publicKey,
      to,
      amount
    );

    console.log(JSON.stringify(transaction));
  }
}
