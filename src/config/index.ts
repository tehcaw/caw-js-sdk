import {
    MintableCAW_CONTRACT, CawName_CONTRACT, CawActions_CONTRACT,
    CawNameURI_CONTRACT, CawNameMinter_CONTRACT, AHuntersDream_CONTRACT
} from 'src/constants'

import { CAW_ABI, CAW_NAMES_ABI, MINTABLE_CAW_ABI, CAW_NAME_MINTER_ABI } from './ABIs';
import { SUPPORTED_NETWORKS } from "src/types";

type ConfigParams = {
    infuraApiKey: string;
    alchemyApiKey: string;
    network: SUPPORTED_NETWORKS;
    jsonRpcUrl: string;
};

export class Config {

    static INFURA_API_KEY: string;
    static ALCHEMY_API_KEY: string;
    static NETWORK: SUPPORTED_NETWORKS;
    static JSON_RPC_URL: string;

    static contracts = {
        CAW: {
            address: AHuntersDream_CONTRACT,
            abi: CAW_ABI,
        },
        CAW_NAME: {
            address: CawName_CONTRACT,
            abi: CAW_NAMES_ABI,
        },
        CAW_ACTIONS: {
            address: CawActions_CONTRACT,
        },
        CAW_NAME_URI: {
            address: CawNameURI_CONTRACT,
        },
        CAW_NAME_MINTER: {
            address: CawNameMinter_CONTRACT,
            abi: CAW_NAME_MINTER_ABI,
        },
        MINTABLE_CAW: {
            address: MintableCAW_CONTRACT,
            abi: MINTABLE_CAW_ABI,
        }
    };

    static init({ infuraApiKey, alchemyApiKey, network, jsonRpcUrl }: ConfigParams) {
        this.INFURA_API_KEY = infuraApiKey;
        this.ALCHEMY_API_KEY = alchemyApiKey;
        this.NETWORK = network;
        this.JSON_RPC_URL = jsonRpcUrl;
    }
}
