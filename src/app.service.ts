import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import abi from './abi.json';

@Injectable()
export class AppService {
  private contractAddress = ''
  private contractABI = abi;
  private walletPrivateKey =
    ''
  private walletAddress = ''
  private wallet;
  private provider;
  private contract;
  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      'https://eth-sepolia.g.alchemy.com/v2/35cMnLxFYB6rgXLFG3zUPemouOiBWJ00',
    );
    this.wallet = new ethers.Wallet(this.walletPrivateKey, this.provider);
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.wallet,
    );
  }

  async burnToken(): Promise<any> {
    {
      //Example: Burn tokens from your own account
      const burnAmount = ethers.parseUnits('2', 18); // Amount to burn
      const burnTx = await this.contract.burn(burnAmount);
      await burnTx.wait();
      console.log(`Burned 2 tokens from caller's balance`);
    }
  }

  async createToken(): Promise<any> {
    const data = await this.contract.mint(
      this.walletAddress,
      ethers.parseUnits('100000000', 18),
    );
    console.log('minted uints', { data });
  }
  async transferToken(): Promise<any> {
    const recipient = this.walletAddress;
    const amount = ethers.parseUnits('10', 18); // Amount of tokens to transfer
    const transferTx = await this.contract.transfer(recipient, amount);
    const data = await transferTx.wait();
    console.log(`Transferred 10 tokens to ${recipient}`);
    return data;
  }

  async getTokenInfo(): Promise<{
    balance: any;
    symbol: any;
    name: any;
    walletAddress: string;
  }> {
    // Example: Get the token name
    const name = await this.contract.name();
    console.log('Token Name:', name);

    // Example: Get the token symbol
    const symbol = await this.contract.symbol();
    console.log('Token Symbol:', symbol);

    // Example: Get total supply
    const totalSupply = await this.contract.totalSupply();
    console.log('Total Supply:', ethers.formatUnits(totalSupply, 18));

    // Example: Check balance of an account

    const balance = await this.contract.balanceOf(this.walletAddress);
    console.log(
      `Balance of ${this.walletAddress}:`,
      ethers.formatUnits(balance, 18),
    );
    return {
      walletAddress: this.walletAddress,
      balance: ethers.formatUnits(balance, 18),
      symbol: symbol,
      name: name,
    };
  }
  async approveToken(): Promise<any> {
    const spender = this.walletAddress;
    const approveAmount = ethers.parseUnits('5', 18);
    const approveTx = await this.contract.approve(spender, approveAmount);
    const data = await approveTx.wait();
    console.log(`Approved ${spender} to spend 5 tokens`);
    return data;
  }
}
