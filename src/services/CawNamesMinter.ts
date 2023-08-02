import { type Provider, type Signer, formatEther, type TransactionReceipt } from 'ethers'

import { Config } from 'src/config'
import { getCawPriceInUsd, getEthPriceInUsd } from "src/utils/tokenPrice";
import { EmitEventType } from 'src/types';
import { CostOfNameModel } from 'src/types/dtos/CostOfNameModel';
import { BaseContractService } from "./BaseContract";

export type CawNameMinterParams = {
  userName: string;
  onEmit?: (event: EmitEventType) => void;
}

/**
* Contract name :  CawNameMinter
* Get the cost of a name, validate the name, and mint a NTF-Username
* https://goerli.etherscan.io/address/0x56F0d5DA1Bc735e03d6A4cd988784ED498FD9Ee3
*/
export class CawNameMinterService extends BaseContractService {

  constructor(provider: Provider, signer: Signer) {
    super(provider, signer, Config.contracts.CAW_NAME_MINTER.abi, Config.contracts.CAW_NAME_MINTER.address);
  }

  async getCostOfName(userName: string): Promise<CostOfNameModel> {

    const cost = await this.contract.costOfName(userName);
    const cawUSD = await getCawPriceInUsd();
    const ethUSD = await getEthPriceInUsd();

    const costInWei = parseFloat(formatEther(cost));
    const cawToEth = cawUSD / ethUSD;
    const costInEth = costInWei * cawToEth;
    const constInUsd = costInWei * cawUSD;

    return {
      costInCaw: costInWei,
      costInEth,
      constInUsd
    }
  }

  async getIdByUserName(userName: string): Promise<number> {
    const id = await this.contract.idByUsername(userName);
    const index = parseInt(id.toString());
    return index;
  }

  async isValidUsername(userName: string): Promise<boolean> {
    const result = await this.contract.isValidUsername(userName);
    return Boolean(result);
  }

  async mintUserName(params: CawNameMinterParams) {

    const { userName, onEmit } = params;
    onEmit?.('before');
    const tx = await (this.contractRunner as any).mint(userName);
    onEmit?.('sent');

    const gas = this.provider.estimateGas(tx);
    const receipt: TransactionReceipt = await tx.wait()
    onEmit?.('completed');

    return {
      gas,
      tx,
      receipt,
    }
  }
}
