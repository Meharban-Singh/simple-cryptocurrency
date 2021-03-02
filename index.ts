import { Wallet } from "./src/Wallet";

const meharban = new Wallet();
const harman = new Wallet();
const bhupi = new Wallet();

meharban.transfer(100, harman.publicKey);
harman.transfer(41, bhupi.publicKey);
bhupi.transfer(20, meharban.publicKey);
