import { type Provider, type InterfaceAbi, Network, Contract, InfuraProvider } from "ethers";
import { SUPPORTED_NETWORKS } from "src/types";

export type ContractParams = {
    address: string;
    network: SUPPORTED_NETWORKS;
    apiKey: string;
    abi: InterfaceAbi;
    provider: Provider | null;
}

export function getContract(params: ContractParams) {

    const { address, abi, network, apiKey, provider: providerArg } = params;
    const _network = Network.from(network.toLowerCase());

    const provider = providerArg || new InfuraProvider(_network, apiKey);
    const contract = new Contract(address, abi, provider);
    return contract;
}
