import { Network } from "ethers";

export function getExplorerUrl({ network, addressOrTx, type }: { network: string | number; addressOrTx: string; type: 'address' | 'tx'; }) {

    const _network = Network.from(network);
    let url = '';

    switch (_network.chainId) {
        case BigInt(1):
            url = `https://etherscan.io/${type}/${addressOrTx}`;
            break;
        case BigInt(3):
            url = `https://ropsten.etherscan.io/${type}/${addressOrTx}`;
            break;
        case BigInt(4):
            url = `https://rinkeby.etherscan.io/${type}/${addressOrTx}`;
            break;
        case BigInt(5):
            url = `https://goerli.etherscan.io/${type}/${addressOrTx}`;
            break;
        case BigInt(42):
            url = `https://kovan.etherscan.io/${type}/${addressOrTx}`;
            break;
        default:
            url = `https://etherscan.io/${type}/${addressOrTx}`;
            break;
    }

    return url;
}

export function getOpenSeaUrl(network: string | number, nftCTAddress: string, userId: number) {

    const _network = Network.from(network);

    switch (_network.chainId) {
        case BigInt(1):
            return `https://opensea.io/assets/${nftCTAddress}/${userId}`;
        default:
            return `https://testnets.opensea.io/assets/${_network.name}/${nftCTAddress}/${userId}`;
    }
}
