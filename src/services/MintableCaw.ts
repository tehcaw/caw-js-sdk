import { type Provider, type Signer, type TransactionResponse, type TransactionReceipt, formatEther, parseEther } from 'ethers'

import { Config } from 'src/config'
import { BaseContractService } from "./BaseContract";
import { EmitEventType } from 'src/types';

export type MintableCAWEmitMethodType = 'mint' | 'approval' | 'transfer';

type CommonParams = {
  amount: number
  onEmit?: (method: MintableCAWEmitMethodType, event: EmitEventType) => void;
}

export type MintParams = CommonParams & {
  userAddress: string,
}

export type ApproveParams = CommonParams & {
  amount: number,
}

export type TransferParams = CommonParams & {
  fromAddress: string,
  toAddress: string,
}
/**
* Contract name :  MintableCAW
* Swap CAW to mCAW
* https://goerli.etherscan.io/address/0x0bc5f399265fA0Fb95F5473c8ec1737d1dBB015c
*/
export class MintableCawService extends BaseContractService {

  private readonly spenderAddress = Config.contracts.CAW_NAME_MINTER.address;

  constructor(provider: Provider, signer: Signer) {
    super(provider, signer, Config.contracts.MINTABLE_CAW.abi, Config.contracts.MINTABLE_CAW.address);
  }

  async getDecimals() {
    return this.contract.decimals();
  }

  async getSymbol() {
    return this.contract.symbol();
  }

  async getName() {
    return this.contract.symbol()
  }

  async getTotalSupply() {
    return this.contract.totalSupply()
  }

  async getBalanceOf(address: string) {
    const result = await this.contract!.balanceOf(address);
    const balance = formatEther(result);
    return parseFloat(balance);
  }

  async mintMCAW(params: MintParams): Promise<{ tx: TransactionResponse, receipt: TransactionReceipt }> {

    const { userAddress, amount, onEmit } = params;
    const parsedAmount = parseEther(amount.toString());

    onEmit?.('mint', 'before');
    const tx = await (this.contractRunner as any).mint(userAddress, parsedAmount);
    onEmit?.('mint', 'sent');
    const receipt = await tx.wait();
    onEmit?.('mint', 'completed');

    return { tx, receipt };
  }

  async approveMCAW(params: ApproveParams): Promise<{ tx: TransactionResponse, receipt: TransactionReceipt }> {

    const { amount, onEmit } = params;
    const parsedAmount = parseEther(amount.toString());

    onEmit?.('approval', 'before');
    const tx = await (this.contractRunner as any).approve(this.spenderAddress, parsedAmount);
    onEmit?.('approval', 'sent');
    const receipt = await tx.wait();
    onEmit?.('approval', 'completed');

    return { tx, receipt };
  }

  async transferFrom(params: TransferParams): Promise<{ tx: TransactionResponse, receipt: TransactionReceipt }> {

    const { fromAddress, toAddress, amount, onEmit } = params;
    const parsedAmount = parseEther(amount.toString());

    onEmit?.('transfer', 'before');
    const tx = await (this.contractRunner as any).transferFrom(fromAddress, toAddress, parsedAmount);
    onEmit?.('transfer', 'sent');
    const receipt = await tx.wait();
    onEmit?.('transfer', 'completed');

    return { tx, receipt };
  }
}
