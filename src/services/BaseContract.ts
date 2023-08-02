import { type Provider, type Signer, type Contract, InterfaceAbi, BaseContract } from 'ethers'

import { getContract } from "src/utils/contract";
import { Config } from 'src/config'
import { Address, SUPPORTED_NETWORKS } from "src/types";

/**
 * Base class for all contract services
 */
export abstract class BaseContractService {

  readonly contract: Contract;
  readonly apiKey: string;
  readonly network: SUPPORTED_NETWORKS;
  readonly provider: Provider;
  readonly signer: Signer;
  readonly contractRunner: BaseContract;

  constructor(provider: Provider, signer: Signer, abi: InterfaceAbi, address: Address) {

    this.apiKey = Config.INFURA_API_KEY;
    this.network = Config.NETWORK;
    this.provider = provider;
    this.signer = signer;

    this.contract = getContract({
      abi: abi,
      address: address,
      apiKey: this.apiKey,
      network: this.network,
      provider: this.provider,
    })

    this.contractRunner = this.contract.connect(this.signer);
  }
}
