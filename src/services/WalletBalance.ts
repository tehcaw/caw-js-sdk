import { type Provider, type Contract, formatEther } from "ethers";

import { Config } from 'src/config';
import { getContract } from "src/utils/contract";
import { WalletBalanceModel } from "src/types/dtos/WalletBalanceModel";
import { SUPPORTED_NETWORKS } from "src/types";

const DEFAULT_BALANCE: WalletBalanceModel[] = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 0,
    },
    {
        symbol: 'CAW',
        name: 'A Hunters Dream',
        amount: 0,
    },
    {
        symbol: 'mCAW',
        name: 'Mintable CAW',
        amount: 0,
    }
];

function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Return the balance of the wallet for the main tokens : ETH, CAW, mCAW
 */
export class WalletBalanceService {

    private account: string;
    private network: SUPPORTED_NETWORKS;
    private provider: Provider
    private cawContract: Contract;
    private mCawContract: Contract;
    private initialBalance: WalletBalanceModel[];

    constructor(account: string, network: SUPPORTED_NETWORKS, provider: Provider) {

        this.account = account;
        this.network = network;
        this.initialBalance = WalletBalanceService.getInitialtBalance();
        this.provider = provider;
        console.info('SDk.WalletBalanceService', { account, network });

        this.cawContract = getContract({
            provider: this.provider,
            address: Config.contracts.CAW.address,
            abi: Config.contracts.CAW.abi,
            apiKey: Config.INFURA_API_KEY,
            network: this.network,
        });

        this.mCawContract = getContract({
            provider: provider,
            address: Config.contracts.MINTABLE_CAW.address,
            abi: Config.contracts.MINTABLE_CAW.abi,
            apiKey: Config.INFURA_API_KEY,
            network: this.network,
        })
    }

    static getInitialtBalance(): WalletBalanceModel[] {
        return DEFAULT_BALANCE.map((item) => deepCopy(item));
    }

    async getEthBalance() {
        try {
            const data = await this.provider.getBalance(this.account);
            const _bal = Number(formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getCawBalance() {

        try {
            const data = await this.cawContract.balanceOf(this.account);
            const _bal = Number(formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getMintableCawBalance() {

        try {
            const data = await this.mCawContract.balanceOf(this.account);
            const _bal = Number(formatEther(data));
            return _bal;
        }
        catch (error) {
            return 0;
        }
    }

    async getBalances() {

        const eth_prom = this.getEthBalance();
        const caw_prom = this.getCawBalance();
        const mcaw_prom = this.getMintableCawBalance();
        const [eth, caw, mcaw] = await Promise.all([eth_prom, caw_prom, mcaw_prom]);

        return this.initialBalance.map((asset) => {

            if (asset.symbol === 'ETH') {
                return { ...asset, amount: eth }
            }

            if (asset.symbol === 'CAW') {
                return { ...asset, amount: caw }
            }

            if (asset.symbol === 'mCAW') {
                return { ...asset, amount: mcaw }
            }

            return asset;
        });
    }
}
