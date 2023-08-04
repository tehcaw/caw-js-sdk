import { type Provider, type Signer } from "ethers";

import { Config } from "src/config";
import { CawActionData } from "src/types/cawActions";
import { BaseContractService } from "./BaseContract";

type ProcessActionParams = {
  actions: CawActionData[];
  v: number;
  r: string;
  s: string;
}

/**
* Contract name :  CawActions
* https://goerli.etherscan.io/address/0x6B22437861eCC2Ea93fEcB742EA3BD5E1d3C7307
*/
export class CawActionsService extends BaseContractService {

  constructor(provider: Provider, signer: Signer) {
    super(provider, signer, Config.contracts.CAW_NAME.abi, Config.contracts.CAW_NAME.address);
  }

  async proccessAction(params: ProcessActionParams) {

    const { actions, v, r, s } = params;
    const runner = this.contractRunner as any;

    const tx = await runner.processAction(actions, v, r, s);
    const receipt = await tx.wait();
    return receipt;
  }

  async isVerified(tokenId: number, reducedSig: string): Promise<boolean> {
    return await this.contract.isVerified(tokenId, reducedSig);
  }

  async likes(tokenId: number, reducedSig: string): Promise<number> {
    return await this.contract.likes(tokenId, reducedSig);
  }

  async followerCount(accountId: number): Promise<number> {
    return await this.contract.followerCount(accountId);
  }
}
