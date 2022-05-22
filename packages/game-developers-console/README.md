# Game Developers Console

Web app, written in React and designed for game developers to create and manage Asylum entities: create item templates, manage interpretations, mint NFTs.

### Run Game Developers Console (manual setup)

> Tested on:
> - node version: **v17.9.0**
> - npm version: **v8.5.5**

You have set up and run three processes in the background:
- Asylum Item NFT substrate node
- Local IPFS daemon
- Game Developers Console React app

Follow the steps below:

1. Build and run [asylum-item-nft](https://gitlab.com/asylum-space/asylum-item-nft) substrate node:
```
node-asylum --dev
```

2. [Install](https://docs.ipfs.io/install/command-line/#official-distributions) and run the local IPFS node :
```
ipfs daemon
```
> Note: execute the following command to avoid CORS issues:
> ```
> ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
> ```

3. Install dependencies:
```
yarn
```

4. [Optional] Seed data:

   1. Navigate `./packages/connection-libary` and create `.env.local` file with the following content:
    ```
    SEEDER_MNEMONIC = eternal danger cherry radar exit damage slam hip say relief awesome middle
    ASYLUM_NODE_URL = ws://127.0.0.1:9944
    IPFS_NODE_URL = http://127.0.0.1:5001
    ```
   2. Run `yarn seed`
    ```
    yarn seed
    ```
   3. Import account to PolkadotJS extension from seed phrase:
    ``` 
    eternal danger cherry radar exit damage slam hip say relief awesome middle
    ```
   > NOTE: seeded data will be lost after each restart of `node-asylum`. To keep your data after a restart, you can use `--base-path` option.
   ```
   ./node-asylum --dev --base-path /tmp/node-asylum
   ```

5. Start Game Developers Console locally:
``` 
yarn start
```

### Run Game Developers Console (Docker setup)

You can run all three processes in the **Docker** (it's implied that you have created `.env.local`, as described in the step 4.1 of [manual setup](/packages/game-developers-console/README.md#run-game-developers-console-manual-setup)).
Install [Docker](https://docs.docker.com/get-docker/) and run the following command from the root folder:

```
docker-compose up
``` 

It will set up and run three containers and **automatically seed the mock data**.

> Note: execute the following command inside `asylum-ui-ipfs` container to avoid CORS issues and restart container:
> ```
> ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
> ```

### Guides

- [Testing guide](docs/testing-guide.md)

### For Asylum Developers

The project utilizes Prettier code formatting tools (check rules in `.prettierrc`).

Before starting development, please make sure you're familiar with the tools used across the project:
- [Tailwind](https://tailwindcss.com/docs/installation)
- [React Query](https://react-query.tanstack.com/overview)
- [MobX](https://mobx.js.org/README.html)
- [Polkadot JS](https://polkadot.js.org/docs/api/)
