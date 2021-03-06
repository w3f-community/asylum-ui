# Game Developers Console Testing Guide

This guide follows you through the process of configuring Templates and Interpretations for your NFTs via the web interface of Game Developers Console.

#### Step 1: Setup and run Game Developers Console web app

Choose one of two options to run Game Developers Console locally:
- [Manual setup](/packages/game-developers-console/README.md#run-game-developers-console-manual-setup)
- [Docker setup](/packages/game-developers-console/README.md#run-game-developers-console-docker-setup)

#### Step 2: Configure PolkadotJS and connect to the local node:

1. [Install](https://polkadot.js.org/extension/) PolkadotJS browser extension.

2. Import seeder account using `SEEDER_MNEMONIC`.

3. Navigate to `http://localhost:3000` in the browser.

4. Click `disconnected` button and connect to the local node:
   ![](img/screenshot-1.png)

5. Click `connect wallet` button -> Select `Polkadot{.js} wallet` -> Select seeder account, which you have imported before:
   ![](img/screenshot-2.png)

6. After that, you will see the list of games associated with the seeder account. Select the first one, for instance:
   ![](img/screenshot-3.png)

7. You can click `game overview` button and check game metadata, which is configured by the seed script:
   ![](img/screenshot-4.png)

#### Step 3: Configure Template and Interpretations:

1. Navigate to the `templates` page and click `+ create template` button. Here you have to fill in metadata related to the Template (`Name`, `Description`). All Templates should have at least one visual Interpretation with `default-view` tag. This Interpretation can be used in the marketplace or inventory and represents the general visual features of Template.
> Note: at the moment, the form works good only with `image/*` sources, but in fact, Interpretation can have any source type, even not visual, but text

   ![](img/screenshot-5.png)

2. Adding Tags affects the metadata of Interpretation. You can check the result in `Raw Metadata` field. **Consider tags as a verbal description of Interpretation**. Tags can carry metadata fields with predefined or configurable values, or even without any metadata, bringing specific semantics to the Interpretation (like the `pixeled` tag):
   ![](img/screenshot-6.png)

3. After submitting Template and signing a transaction, you can find the Template using the search bar:
   ![](img/screenshot-7.png)

4. Click on the Template and check its metadata and Interpretations. You can add new Interpretation to the Template or edit the existing one:
   ![](img/screenshot-8.png)

5. Let's add a new Interpretation with `pixeled tag`.
> Note: after submitting the change-set Template proposal, you'll be passed through the DAO acceptance process. Right now, the flow is simplified, and it's implied that DAO always accepts the proposal. Anyway, there will be two transactions:
> 1. Create change-set proposal
> 2. Applying updates to the Template

![](img/screenshot-9.png)

6. Adding Interpretations allows NFT items to have different visual representations within one and multiple games. Suppose we have two visually different games (2D and 3D) which want to share one NFT item. To make it possible, we have to add two more Interpretations: the first one is a 2d sprite atlas, and the second one is a 3d Blender model.
   ![](img/screenshot-10.png)
7. Finally, we have set up our Template with multiple visual Interpretations!
   ![](img/screenshot-11.png)

