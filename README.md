# CAW - JavaScript SDK 🌙

<p align="center">
  <a href="https://caw.is">
      <img src="https://caw.is/assets/images/180x180.png" height="128">
  </a>
<br>
<br>
</p>

# About CAW
A truly censorship-resistant, decentralized messaging protocol.


## 📦 Environments
| Name            | Link                                |
| --------------- | ----------------------------------- |
| Paper         | https://caw.is/                 |
| Alpha Test UI         | https://teh-eyes.vercel.app/         |


<hr />

## Initial Roadmap
* (Progress) Move CAW Actions to a single-responsability SDK
* (Progress) Implement On-chain smart contract actions
* (Pending ) Set up Orbit-DB as a second source of truth
* (Pending ) Document the SDK and its usage (Examples, Snippets, DocSite, etc)

### Reasoning
 - Framework agnostic, so it can be used in any project.
 - Leverage the SRP to speed up CAW Frontends
 - Rely on Wallet Providers so the SDK doesn't have to deal with them.
 - Define a structured pattern of saving and sharing data across many frontends.
 - Encourage communities to build their own interfaces to unleash their creative potential.
 - Provide a way to interact with the CAW smart contracts in a simple way.



# Getting Started

Alpha version of the SDK might suffer breaking changes

###
```bash
    npm i @cawmmunity/caw-js-sdk
```

### Setup on your project
```ts
    import { Config } from "@cawmmunity/caw-js-sdk";

    // Initialize the SDK, jsonRpcUrl is the primary provider and the other two fallbacks.
    Config.init({
      jsonRpcUrl: AppEnvSettings.jsonRpcUrl,
      infuraApiKey: AppEnvSettings.keys.INFURA_API_KEY,
      alchemyApiKey: AppEnvSettings.keys.ALCHEMY_API_KEY,
      network: 'goerli',
});
```

### Mint a username
```ts
    import { CawNameMinterService, CawNamesService, MintableCawService, WalletBalanceService } from '@cawmmunity/caw-js-sdk/dist/services';

    const provider  = // Your provider here
    const signer    = // Your signer here
    const userName = 'cawmmunity';


    const cawMinterContract = CawNameMinterService(provider, signer);
    const mintableCawContract = MintableCawService(provider, signer);

    const costInCaw  = await cawMinterContract.getCostOfName(userName);

    // Mint the amount of mCAW needed to mint a username
    await minterContract.mintMCAW({
        amount: costInCaw,
        userAddress: walletAddress,
        onEmit: (m, e) => {...}
      });

    // Approve the mCAW to be spent
    await mintableCawContract.approveMCAW({
      amount: costInCaw,
      onEmit: (m, e) => {...}
    });

    // Mint the username
    const { tx, gas, receipt } = await cawMinterContract.mintUserName({
        userName,
        onEmit: (e) => {...}
      });
```

### Get the usernames of a wallet
```ts

    const walletAddress = '0x...';
    const fetchAvatar = true; // SVG Avatar
    const provider = // Your provider here
    const signer = // Your signer here

    const cawNamesContract = CawNamesService(provider, signer)
    const usernames = await cawNamesContract.getTokens(walletAddress, fetchAvatar);
```

### Validate
```ts

    const userName = 'cawmmunity';
    const isValid =  await cawMinterContract.isValidUsername(userName);

    // Many of the smart contract functions have already been written in the SDK.
```

### There are more to come and much moe to document. Stay tuned!

### Follow the endorsed socials.
