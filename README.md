# Asylum ui

### Run Game Developers Console (localy)

1. Build and run [asylum-item-nft](https://gitlab.com/asylum-space/asylum-item-nft) substrate node:
```bash
node-asylum --dev
```

2. [Install](https://docs.ipfs.io/install/command-line/#official-distributions) and run local IPFS node :
```bash
ipfs daemon
```

3. Install dependencies:
```bash
yarn
```

4. [Optional] Seed data:
    1. Create `.env.local` file in root directory of `connection-libary` with the following content:
    ```bash
    SEEDER_MNEMONIC = eternal danger cherry radar exit damage slam hip say relief awesome middle
    ENDPOINT_URL = ws://127.0.0.1:9944
    ```
   2. Run `yarn seed`
    ```bash
    yarn seed
    ```
   3. Import account to PolkadotJS extension from seed phrase:
    ```bash 
    eternal danger cherry radar exit damage slam hip say relief awesome middle
    ```
   
5. Start Game Developers Console locally:
```bash 
yarn start
```
