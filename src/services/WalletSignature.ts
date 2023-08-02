import { Wallet, recoverAddress, type Provider, hashMessage } from 'ethers'

/**
 * Service to sign and verify message with a wallet
 */
export class WalletSignatureService {

  privateKey: string;
  wallet: Wallet;

  constructor(pk: string, provider: Provider) {
    this.privateKey = pk;
    this.wallet = new Wallet(this.privateKey, provider);
  }

  async sign(message: string): Promise<string> {
    return await this.wallet.signMessage(message);
  }

  async verify(message: string, signature: string): Promise<boolean> {

    const digest = hashMessage(message);
    const verifySigner = recoverAddress(digest, signature);

    return verifySigner === this.wallet.address;
  }
}
