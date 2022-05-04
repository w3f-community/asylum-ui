# Game Developers Console Testing Guide

Firstly, you have to configure local env and run 3 processes:
1. Asylum node
2. Local IPFS daemon
3. Game Developers Console web app

Follow instructions to run [Game Developers Console (locally)](packages/game-developers-console/README.md).
Make sure you're using the node version: **v17.9.0**.

### Steps

#### Step 1: Seed mock data for your local node


1. Create `.env.local` file in `packages/connection-library` with the following content (you can specify any `SEEDER_MNEMONIC`):
```
SEEDER_MNEMONIC = eternal danger cherry radar exit damage slam hip say relief awesome middle
ENDPOINT_URL = ws://127.0.0.1:9944
```

2. Run `seed` script to configure testing data on local node:
```
yarn seed
```

#### Step 2: Configure PolkadotJS and connect to the local node:

1. [Install](https://polkadot.js.org/extension/) PolkadotJS browser extension.
2. Import seeder account using `SEEDER_MNEMONIC`.
3. Navigate to `http://localhost:3000` in browser:
4. Click `disconnected` button and connect to the local node:
![](img/screenshot-1.png)



