import { type Provider, type Signer, type TransactionResponse, formatEther } from "ethers";

import { CawUserNameModel } from "src/types/dtos/CawUserNameModel"
import { TokenUriModel } from "src/types";
import { Config } from "src/config";
import { BaseContractService } from "./BaseContract";

export type MintCawNameParams = {
  userName: string;
  sender: string;
  newId: number;
  onTransactionSent?: (tx: TransactionResponse) => void;
}

/**
* Contract name :  CawName
* https://goerli.etherscan.io/token/0x3F63Ad5E6309135a9D5fD3540270b93f56FD9CD9
*/
export class CawNamesService extends BaseContractService {

  constructor(provider: Provider, signer: Signer) {
    super(provider, signer, Config.contracts.CAW_NAME.abi, Config.contracts.CAW_NAME.address);
  }

  async getTokenURI(userId: BigInt): Promise<TokenUriModel> {
    const data = await this.contract.tokenURI(userId);
    const json = JSON.parse(atob(data.split(',')[1]));
    const { name, description, image } = json || {};
    return { name, description, image };
  }

  async getTokens(address: string, fetchAvatar: boolean): Promise<CawUserNameModel[]> {

    const tokens = await this.contract.tokens(address);
    const tokensArray: CawUserNameModel[] = tokens.map((token: any) => {

      const balance = Number(formatEther(token.balance));
      const _u: CawUserNameModel = {
        id: BigInt(token.tokenId),
        balance: balance,
        userName: (token.username || ''),
        avatar: '',
      };

      return _u;
    });

    if (fetchAvatar) {

      const ids = tokensArray.map((t) => t.id);
      const promises = ids.map((id) => this.getTokenURI(id));
      const results = await Promise.all(promises);

      tokensArray.forEach((t, i: number) => {
        t.avatar = results[i].image;
      });
    }

    return tokensArray;
  }

  async getUserNameById(userId: BigInt): Promise<string> {
    return this.contract.usernames(userId);
  }

  async tokenIdByIndex(index: BigInt): Promise<BigInt> {
    return this.contract.tokenByIndex(index);
  }

  async rewardMultiplier(): Promise<BigInt> {
    return this.contract.rewardMultiplier();
  }
}
