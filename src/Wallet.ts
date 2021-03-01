import { generateKey } from "./keyGen";

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
}
