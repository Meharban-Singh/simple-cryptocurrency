import Block from "./Block";
import Transaction from "./Transaction";

export class Blockchain {
  private static instance: Blockchain = new Blockchain();
  private chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];

  private readonly MINING_REWARD: number = 100; // mining reward
  private readonly DIFFICULTY: number = 100; // mining difficulty

  /**
   * Inits a new Blockchain
   */
  private constructor() {
    // Genesis Block
    this.chain.push(this.createGenesisBlock());
  }

  /**
   * Returns the only instance of Blockchain
   *
   * @return {Blockchain}
   */
  public static getInstance(): Blockchain {
    return this.instance;
  }

  /**
   * Returns and create a genesis block
   *
   * @return {Block}
   */
  private createGenesisBlock() {
    return new Block(new Transaction("genesis", "new currency", 100), "");
  }

  /**
   * Returns the most recent block of the Transaction
   *
   * @return {Block}
   */
  latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // Proof of work
  /**
   * Mines a block
   */
  mine(miningRewardAddress: string) {
    // Generate reward for the miner and add it to the pending tsxs
    const rewardTransaction = new Transaction(
      "main",
      miningRewardAddress,
      this.MINING_REWARD
    );
    this.pendingTransactions.push(rewardTransaction);

    // start mining the first block from pending Transactions
    let toBeMined: Transaction | undefined = this.pendingTransactions.shift();

    if (toBeMined === undefined) return "Nothing to mine";

    let block = new Block(toBeMined, this.latestBlock().hash);
    block.mine(this.DIFFICULTY);

    this.chain.push(block);
  }

  /**
   * Add a new transaction to the list of pending transactions.
   *
   * @param {Transaction} transaction
   */
  addTransaction(transaction: Transaction) {
    // Verify the transactiion
    if (!transaction.isValid()) {
      console.log("Cannot add invalid transaction to chain");
      return false;
    }

    // Making sure that the amount sent is not greater than existing balance
    if (
      this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount
    ) {
      console.log("Not enough balance");
      return false;
    }

    this.pendingTransactions.push(transaction);
  }

  /**
   * Returns the balance of a given wallet address.
   *
   * @param {string} address
   * @returns {number} The balance of the wallet
   */
  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (let block of this.chain) {
      let tx = block.transaction;

      if (tx.fromAddress === address) {
        balance -= tx.amount;
      }

      if (tx.toAddress === address) {
        balance += tx.amount;
      }
    }

    return balance;
  }

  /**
   * Returns a list of all transactions that happened
   * to and from the given wallet address.
   *
   * @param  {string} address
   * @return {Transaction[]}
   */
  getAllTransactionsForWallet(address: string): Transaction[] {
    const txs = [];

    for (const block of this.chain) {
      let tx = block.transaction;
      if (tx.fromAddress === address || tx.toAddress === address) {
        txs.push(tx);
      }
    }

    return txs;
  }

  /**
   * Checks if the chain is valid
   *
   * @returns {boolean}
   */
  isValid() {
    // verify genesis block
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    // Other blocks
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.isValid()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
