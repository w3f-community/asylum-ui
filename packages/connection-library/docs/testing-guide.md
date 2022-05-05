# Connection Library Testing Guide

This testing guide will go throw the similar flow as the [Asylum node Testing Guide](https://gitlab.com/asylum-space/asylum-item-nft/-/blob/main/docs/testing-guide.md) but using the Connection Library.

Also, almost all functionality of Connection Library is covered in the [seed script](https://gitlab.com/asylum-space/asylum-ui/-/blob/main/packages/connection-library/seed/index.ts), that can be used as a reference.

> Note: interactions with NFT items are not supported in current version of the Connection Library 

### Installation

- Install and run [Asylum node](https://gitlab.com/asylum-space/asylum-item-nft/-/blob/main/README.md)
- Add [Connection Library](https://gitlab.com/asylum-space/asylum-ui/-/tree/main/packages/connection-library) as a local dependency package in your npm project.

### Prepare account

To start working with connection library we need to prepare an account:

```js
import { AsylumApi } from '@asylum-ui/connection-library'

const endpoint = "ws://127.0.0.1:9944"

const api = AsylumApi.connect(endpoint)
   .then(async (api) => {
        const mnemonic = "eternal danger cherry radar exit damage slam hip say relief awesome middle"   

        const testAccount = new Keyring({ type: 'sr25519' }).addFromUri(mnemonic)
        const alice = new Keyring({ type: 'sr25519' }).addFromUri('//Alice')

        await api
           .withKeyringPair(alice)
           .signAndSendWrapped(api.polkadotApi.tx.balances.transfer(seeder.address, 10 ** 12))

        return api.withKeyringPair(testAccount)
   }
```

All subsequent steps will be performed with the current preset. 

### Tags

To create new tags, you need to upload tag's metadata to IPFS and call `createInterpretationTag`. In the example, we're creating a couple tags `default-view`,`jpeg`:


1. Upload to IPFS `default-view` tag metadata and get its CID:

```js
const defaultViewTagMetadata = {
  "id": "default-view",
  "description": "The default visualization for the item. MUST be present in all NFTs.",
  "metadataExtensions": {}
}

const defaultViewTagMetadataCID = await api.uploadMetadata(defaultViewTagMetadata)
```

2. Create a `default-view` tag:

```js
await api.createInterpretationTag('default-view', defaultViewTagMetadataCID)
```

3. Upload to IPFS `jpeg` tag metadata and get its CID:

```js

const jpegTagMetadata = {
  "id": "jpeg",
  "description": "in .jpeg format",
  "metadataExtensions": {
      "fileds": [
        {
          "name": "format",
          "type": "string",
          "default": ".jpeg",
          "description": "The format of source is JPEG"
        }
      ]
  }
}

const jpegTagMetadataCID = await api.uploadMetadata(jpegTagMetadata)
```

4. Create a `jpeg` tag:

```js
await api.createInterpretationTag('jpeg', jpegTagMetadataCID)
```

5. Verify tags metadata:

```js
console.log(await api.tagMetadataOf("default-view"))
console.log(await api.tagMetadataOf("jpeg"))
```

### Template

Now we can create a template with interpretations that support tags created in the previous step. To do this, we need to call `createTemplate`.

1. Upload template metadata to IPFS and get its CID:

```js
const templateMetadata = {
  "description": "The best weapon for the Helloween party 2022",
}

const templateMetadataCID = await api.uploadMetadata(templateMetadata)
```

2. Upload interpretation metadata to IPFS and get its CID:

```js
const interpretationMetadata = {
  "description": "Default view interpretation in JPG format",
  "format": ".jpg"
}

const interpretationMetadataCID = await api.uploadMetadata(interpretationMetadata)
```

3. Upload interpretation source to IPFS and get its CID.
```js
const srcCID = "{INTERPRETATION_SOURCE_CID}"
```

4. Call `createTemplate` method:

```js
const interpretations = [
     {
        "tags": ["default-view", "jpeg"],
        "interpretation": {
           "id": "default-view-jpg",
           "src": srcCID,
           "metadata": interpretationMetadataCID,
        },
     },
]

const maxItems = 100

await api.createTemplate("Old sword", templateMetadataCID, maxItems, interpretations)
```

5. Retrieve data about all interpretations of the created template:

```js
const templateId = '0'

console.log(await api.templateInterpretations(templateId))
```


### Game

1. Create a game:

```js
const gameId = 0,
const admins = [api.keyringPair!.address],
const price = 10000

await api.createGame(gameId, admins, price)
```

2. Set game metadata:
```js
const gameMetadata = {
    title: 'Minecraft',
    img: '{link-to-cover}',
    genre: '3D sandbox game',
    shortDescription: 'Minecraft is a sandbox video game developed by Mojang Studios.',
    description: 'Really long description',
    gallery: [
         '{link-to-screenshot}',
         '{link-to-screenshot}',
         '{link-to-art}',
      ],
      reviews,
}

const gameMetadataCID = await api.uploadMetadata(gameMetadata)

await api.setGameMetadata(gameId, gameMetadataCID, gameMetadata.title, gameMetadata.genre)
```

3. We suppose that our game supports the "Old sword" template. Call `addTemplateSupport` to add association between the game and template:
```js
await api.addTemplateSupport(gameId, templateId)
```

4. Retrieve game data and metadata:
```js
console.log(await api.game(gameId))
console.log(await api.gameMetadataOf(gameId))
```

### Update template

When the template already exists and items are minted we still have a possibility to edit it - extend with new interpretations or fix the old ones.

Let's assume that we want to add a 3d model representation for the "Old sword" template to make it supported in 3d games and also fix the link for 2d interpretation.

> Note: to continue the guide here you need to create all necessary tags for the 3d model (`3d-model`, `obj`) as described in the Tags section **before** moving forward.

1. **Submit proposal**

To do this, anybody could submit a template change proposal. Call `submitTemplateChangeProposal` with two changes - `Add` and `Modify`:

```js
const templateId = 0,
const author = "{AUTHOR_ACCOUNT_ID}",
const changeSet = [
   new TemplateChangeAdd([
      {
         tags: ['3d-model', 'obj'],
         interpretation: {
            id: "3d-model-obj",
            src: "{3D_INTERPRETATION_SOURCE_CID}",
            metadata: "{3D_INTERPRETATION_METADATA_CID}",
         },
      },
   ]),
   new TemplateChangeModify([
      {
          id: '3default-view-jpg55',
          src: '{NEW_INTERPRETATION_SOURCE_CID}',
          metadata: '{METADATA_CID}',
      },
   ]),
],

await api.submitTemplateChangeProposal(entry.author, entry.templateId, entry.changeSet)
```

- In `Modify` change we're describing the changes of source or metadata of already existing interpretation.
- With the `Add` change, we're adding a new interpretation to the template. The important thing here is to keep the new interpretation's tags set unique, as the set of tags is the identifier of the interpretation within the template.

There are also two options for change - `ModifyTags` and `RemoveInterpretation`, that can be used in a similar way.

2. **Wait for the proposal approved**

Let's assume DAO accepted that proposal (currently done automatically after submitting the proposal)

3. **Update template**

Now the template's owner can call `update_template` extrinsic with the id of template and proposal, and all proposed updates will be applied to the template.

```js
const proposalId = 0

await api.updateTemplate(templateId, proposalId)
```
