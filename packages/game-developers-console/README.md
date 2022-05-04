# Game Developers Console

Web app, written in React and designed for game developers to create and manage Asylum entities: create item templates, manage interpetations, mint NFTs.

### Run Game Developers Console (locally)

Tested on: 
- node version: **v17.9.0**
- npm version: **v8.5.5**



1. Build and run [asylum-item-nft](https://gitlab.com/asylum-space/asylum-item-nft) substrate node:
```
node-asylum --dev
```

2. [Install](https://docs.ipfs.io/install/command-line/#official-distributions) and run local IPFS node :
```
ipfs daemon
```

3. Install dependencies:
```
yarn
```

4. [Optional] Seed data:
    1. Create `.env.local` file in root directory of `connection-libary` with the following content:
    ```
    SEEDER_MNEMONIC = eternal danger cherry radar exit damage slam hip say relief awesome middle
    ENDPOINT_URL = ws://127.0.0.1:9944
    ```
   2. Run `yarn seed`
    ```
    yarn seed
    ```
   3. Import account to PolkadotJS extension from seed phrase:
    ``` 
    eternal danger cherry radar exit damage slam hip say relief awesome middle
    ```
   > NOTE: seeded data will be lost after each restart of `node-asylum`. To keep your data after restart, you can use `--base-path` option.
   ```
   ./node-asylum --dev --base-path /tmp/node-asylum
   ```
   
5. Start Game Developers Console locally:
``` 
yarn start
```

### Guides

- [Testing guide](docs/testing-guide.md)
