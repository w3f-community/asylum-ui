import { ChangeSet, Review, TemplateChangeAdd } from '../src/types'

interface ITemplateMockData {
   name: string
   metadata: {
      description: string
   }
   max: number | undefined
   interpretations: [
      {
         tags: string[]
         interpretation: {
            src: string | undefined
            metadata: any
         }
      }
   ]
}

interface IGameMockData {
   id: string
   title: string
   img: string
   genre: string
   shortDescription: string
   description: string
   gallery: string[]
   reviews: Review[]
   supportedTemplates: number[]
}

export const MOCK_ADDRESS = '5FfA88n8kPDd9vH1D35H87kSsGECZ1sq5QiC5nYxD3VrEA89'

export const tags = [
   {
      tag: 'default-view',
      metadata: {
         id: 'default-view',
         description: 'The default representation of item',
         metadataExtensions: {
            fields: [],
         },
      },
   },
   {
      tag: 'inventory-view',
      metadata: {
         id: 'inventory-view',
         description: 'The representation of item in inventory',
         metadataExtensions: {
            fields: [],
         },
      },
   },
   {
      tag: 'animation',
      metadata: {
         id: 'animation',
         description: 'Representation of item with animation',
         metadataExtensions: {
            fields: [],
         },
      },
   },
   {
      tag: '2d-sprite-atlas',
      metadata: {
         id: '2d-sprite-atlas',
         description: '2d picture representation',
         metadataExtensions: {
            fields: [],
         },
      },
   },
   {
      tag: '3d-model',
      metadata: {
         id: '3d-model',
         description: '3d model representation',
         metadataExtensions: {
            fields: [],
         },
      },
   },
   {
      tag: 'blend',
      metadata: {
         id: 'blend',
         description: 'created by Blender 3D',
         metadataExtensions: {
            fields: [
               {
                  name: 'format',
                  type: 'string',
                  defaultValue: '.blend',
                  description: 'The format of source is .blend',
               },
            ],
         },
      },
   },
   {
      tag: 'png',
      metadata: {
         id: 'png',
         description: 'in PNG format',
         metadataExtensions: {
            fields: [
               {
                  name: 'format',
                  type: 'string',
                  defaultValue: '.png',
                  description: 'The format of source is PNG',
               },
            ],
         },
      },
   },
   {
      tag: 'jpeg',
      metadata: {
         id: 'jpeg',
         description: 'in JPEG format',
         metadataExtensions: {
            fields: [
               {
                  name: 'format',
                  type: 'string',
                  defaultValue: '.jpeg',
                  description: 'The format of source is JPEG',
               },
            ],
         },
      },
   },
   {
      tag: 'jpg',
      metadata: {
         id: 'jpg',
         description: 'in JPG format',
         metadataExtensions: {
            fields: [
               {
                  name: 'format',
                  type: 'string',
                  defaultValue: '.jpg',
                  description: 'The format of source is JPG',
               },
            ],
         },
      },
   },
   {
      tag: 'pixeled',
      metadata: {
         id: 'pixeled',
         description: 'pixeled style view',
         metadataExtensions: {
            fields: [],
         },
      },
   },
]

export const templates: ITemplateMockData[] = [
   {
      name: 'Sword',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 100,
      interpretations: [
         {
            tags: ['default-view', 'jpg'],
            interpretation: {
               src: 'https://preview.free3d.com/img/2017/03/1763957643723933051/x7saci6d-900.jpg',
               metadata: {
                  description: 'The default representation of item | in PNG format',
                  format: '.jpg',
               },
            },
         },
      ],
   },
   {
      name: 'Fire sword',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 10,
      interpretations: [
         {
            tags: ['default-view', 'png'],
            interpretation: {
               src: 'https://i.pinimg.com/originals/3a/83/bf/3a83bf5f768ef01338ba534ae4a1447b.png',
               metadata: {
                  description: 'The default representation of item | in PNG format',
                  format: '.png',
               },
            },
         },
      ],
   },
   {
      name: 'Kerosene lamp',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 100,
      interpretations: [
         {
            tags: ['default-view', 'png'],
            interpretation: {
               src: '/img/lamp.png',
               metadata: {
                  description: 'The default representation of item | in PNG format',
                  format: '.png',
               },
            },
         },
      ],
   },
   {
      name: 'Clover leaf',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 100,
      interpretations: [
         {
            tags: ['default-view', 'png'],
            interpretation: {
               src: '/img/clover_leaf.png',
               metadata: {
                  description: 'The default representation of item | in PNG format',
                  format: '.png',
               },
            },
         },
      ],
   },
   {
      name: 'M16: Helloween edition',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 13,
      interpretations: [
         {
            tags: ['default-view', 'jpg'],
            interpretation: {
               src: 'https://zilliongamer.com/uploads/codm/skins/assault/m16/m16-pumpkin-repeater-cod-mobile.jpg',
               metadata: {
                  description: 'The default representation of item | in JPG format',
                  format: '.jpg',
               },
            },
         },
      ],
   },
   {
      name: 'M16: Gold glitter',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 13,
      interpretations: [
         {
            tags: ['default-view', 'jpg'],
            interpretation: {
               src: 'https://zilliongamer.com/uploads/codm/skins/assault/m16/m16-gold-glitter-cod-mobile.jpg',
               metadata: {
                  description: 'The default representation of item | in JPG format',
                  format: '.jpg',
               },
            },
         },
      ],
   },
   {
      name: 'AUG "White rabbit"',
      metadata: {
         description: 'Lorem ipsum dolor sit amet, consect adipiscing elit.',
      },
      max: 13,
      interpretations: [
         {
            tags: ['default-view', 'jpg'],
            interpretation: {
               src: 'https://zilliongamer.com/uploads/pubg-mobile/weapon/type/ar/aug/skin/white-rabbit-aug-big.jpg',
               metadata: {
                  description: 'The default representation of item | in JPG format',
                  format: '.jpg',
               },
            },
         },
      ],
   },
]

// TODO
export const proposals: {
   templateId: number
   author: string
   changeSet: ChangeSet
}[] = [
   {
      templateId: 0,
      author: MOCK_ADDRESS,
      changeSet: [
         new TemplateChangeAdd([
            {
               tags: ['2d-sprite', 'jpg'],
               interpretation: {
                  id: '355',
                  src: 'https://zilliongamer.com/uploads/pubg-mobile/weapon/type/ar/aug/skin/white-rabbit-aug-big.jpg',
                  metadata: 'QmQkvrZ15r4inndd3mpbtHSuxzWbL6Z4ehywVFReANRzoM',
               },
            },
         ]),
      ],
   },
]

const reviews: Review[] = [
   {
      id: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3.5,
      address: MOCK_ADDRESS,
   },
   {
      id: '2',
      text: 'Proin condimentum dapibus libero quis molestie. Fusce a turpis ut turpis hendrerit pellentesque. Quisque in odio eu nulla rutrum laoreet. Donec vitae vehicula eros, sed luctus metus. Fusce quis neque dictum, ornare dui sed, vulputate purus. Donec porta tortor condimentum velit volutpat consectetur. Integer porttitor nulla in nisl laoreet, sit amet porta quam ultrices. Duis at tempor urna. Vestibulum nec convallis neque. Vivamus auctor aliquam aliquam. Maecenas eu arcu urna.',
      rating: 4.5,
      address: MOCK_ADDRESS,
   },
]

export const games: IGameMockData[] = [
   {
      id: '0',
      title: 'Fortnite',
      img: 'https://static-assets-prod.epicgames.com/fortnite/static/webpack/8f9484f10eb14f85a189fb6117a57026.jpg',
      genre: 'Free-to-play Battle Royale',
      shortDescription: 'Join the Resistance in the final battle to free the Zero Point!',
      description:
         'The IO has lined up guards and sky stations, but the Resistance is equipped with new tactics like sprinting, mantling, and more. Board an Armored Battle Bus to be a powerful force or attach a Cow Catcher to your truck for extra ramming power. Take on your opponents in the ultimate battle for the Zero Point in Chapter 3 Season 2: Resistance!\n' +
         'The Chapter 3 Season 2 Battle Pass includes the Master of the Mystic Arts, Doctor Strange. Joining him in the Battle Pass are characters like Tsuki 2.0, the familiar foe Gunnar, and revealed at last: The Origin. Also, complete special Quests to “reprogram” the Omni Sword Pickaxe. Configure it with a different blade, guard, color, and even sound!',
      gallery: [
         'https://static-assets-prod.epicgames.com/fortnite/static/webpack/8f9484f10eb14f85a189fb6117a57026.jpg',
         'https://images.nintendolife.com/screenshots/90272/large.jpg',
         'https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fphotography-blog%2Fpic2-1600x900-775a0694cc0b0f854ef48399ebc33a2db0bac25c.png',
         'https://thefortnitegame.com/images/uploads/products/1/k3h5H_screen_1.jpg',
         'https://www.usitility.com/media/software/screenshots/screenshot-fortnite-battle-royale-13268.webp',
      ],
      reviews,
      supportedTemplates: [0, 1, 2, 3],
   },
   {
      id: '1',
      title: 'GTA V',
      img: 'https://files.tecnoblog.net/wp-content/uploads/2018/07/gta-v.jpg',
      genre: 'Entertainment blockbusters',
      shortDescription:
         'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody — least of all each other.',
      description:
         "Players use melee attacks, firearms and explosives to fight enemies, and may run, jump, swim or use vehicles to navigate the world. To accommodate the map's size, the game introduces vehicle types absent in its predecessor Grand Theft Auto IV, such as fixed-wing aircraft. In combat, auto-aim and a cover system may be used as assistance against enemies.\n" +
         'Should players take damage, their health meter will gradually regenerate to its halfway point. Players respawn at hospitals when their health depletes. If players commit crimes, law enforcement agencies may respond as indicated by a "wanted" meter in the head-up display (HUD).',
      gallery: [
         'https://media-rockstargames-com.akamaized.net/tina-uploads/posts/172872k8a375k8/c1964d6dfe37619793cf9eb073deff3d0719fe00.jpg',
         'https://www.allkeyshop.com/blog/wp-content/uploads/gta-5-urban-assault-e1494861232705.jpg',
         'https://images0.persgroep.net/rcs/g0EGCUsjRuZeAMKz7brBBaofJPI/diocontent/63803610/_crop/1/1/895/505/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8',
         'https://cdn.gamer-network.net/2014/usgamer/GTA-V-PS4-Screenshot-12.jpg',
         'https://sportshub.cbsistatic.com/i/2021/10/22/76f935cf-5bb1-4e4d-af62-26f020a422bd/gta-5-trevor.png',
      ],
      reviews: [],
      supportedTemplates: [0, 1, 2, 3],
   },
   {
      id: '2',
      title: 'Last of Us II',
      img: 'https://upload.wikimedia.org/wikipedia/pt/9/96/The_Last_of_Us_2_capa.png',
      genre: 'Survival game',
      shortDescription:
         "Confront the devastating physical and emotional repercussions of Ellie's actions.",
      description:
         'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming. Living amongst a thriving community of survivors has allowed them peace and stability, despite the constant threat of the infected and other, more desperate survivors.\n' +
         'When a violent event disrupts that peace, Ellie embarks on a relentless journey to carry out justice and find closure. As she hunts those responsible one by one, she is confronted with the devastating physical and emotional repercussions of her actions.',
      gallery: [
         'https://sm.ign.com/ign_nl/news/t/the-last-o/the-last-of-us-part-2-no-plans-for-dlc_uaq6.jpg',
         'https://m.media-amazon.com/images/M/MV5BYzZhYzg1ZjItZDRlNS00YjYxLWExMzUtYmE4NjhiOTExODA4XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg',
         'https://i.ytimg.com/vi/qPNiIeKMHyg/maxresdefault.jpg',
         'https://cdn.gamersnet.nl/wp-content/uploads/2018/12/The-last-of-us-2-e1545827249352.jpg',
         'https://imageio.forbes.com/specials-images/imageserve/5d868c2c6de3150009a4b32d/The-Last-Of-Us-2/960x0.jpg?fit=bounds&format=jpg&width=960',
      ],
      reviews: [],
      supportedTemplates: [0, 1],
   },
   {
      id: '3',
      title: 'Minecraft',
      img: 'https://upload.wikimedia.org/wikipedia/uk/4/48/Minecraft_logo.png',
      genre: '3D sandbox game',
      shortDescription: 'Minecraft is a sandbox video game developed by Mojang Studios.',
      description:
         'In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. \n' +
         'Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world. Game modes include a survival mode, in which players must acquire resources to build the world and maintain health, and a creative mode where players have unlimited resources and access to flight.',
      gallery: [
         'https://cdn.vox-cdn.com/thumbor/8FJns38hEuiAeZcWRpLgJ_umnNI=/0x0:1920x1005/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/4206659/2656292-minecraft-xb1-screen08-png.0.png',
         'https://www.gannett-cdn.com/-mm-/1f2715a8e845d0608c5d7da94e514ee33e97f41c/c=8-0-1908-1071/local/-/media/USATODAY/USATODAY/2014/09/10/1410375973000-minecraft.jpg',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJeV9_zxY3VfNOtT81hhrE4InH8aqkLkIdVGxXPQm06N0-gA4fYCW7dTfjIV6Tww-9js0&usqp=CAU',
         'https://static.actugaming.net/media/2019/05/creeper-minecraft-wallpaper-full-hd-1080p-385694-889x500.jpg',
         'https://akcdn.detik.net.id/visual/2015/03/25/4ba6b811-3765-4572-8c96-eb5891aa7e87_169.jpg?w=650',
         'https://cdn1.dotesports.com/wp-content/uploads/2022/02/19105556/3912568-2f0e7-16345886554882-1920.jpg',
      ],
      reviews: [],
      supportedTemplates: [0, 1, 2, 3],
   },
   {
      id: '4',
      title: 'Call of Duty: WWII',
      img: 'https://image.api.playstation.com/vulcan/img/cfn/1130791_COqLRw6IGlDVHxyV8aqC9_YaF0sCN8IbOlVhzJ6sWm5tlpKTjN8npK2vA_mUJUdyQjP4-U4rEnk7cScmlvoLzXi7.png',
      genre: 'First-person shooter',
      shortDescription:
         'A breathtaking experience that redefines World War II for a new gaming generation',
      description:
         'The game simulates the infantry and combined arms warfare of World War II. An expansion pack, Call of Duty: United Offensive, was developed by Gray Matter Interactive with contributions from Pi Studios and produced by Activision. The game follows American and British paratroopers and the Red Army. \n' +
         'The Mac OS X version of the game was ported by Aspyr Media. In late 2004, the N-Gage version was developed by Nokia and published by Activision. ',
      gallery: [
         'https://media.s-bol.com/g2RGQBgR8LxZ/WL96gpQ/1200x675.jpg',
         'https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2017/11/Call-of-Duty-WWII-Multiplayer-War-screenshot-11_0.jpg',
         'https://media.s-bol.com/g2RGQBgw2l3Z/1200x674.jpg',
         'https://www.callofduty.com/content/dam/atvi/callofduty/wwii/beta/WWII_BETA_Meta_16x9_V2.jpg',
         'https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_1559,w_2772/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2017%2F11%2FCoD_WWII_Launch_Zombies_01_wm.jpg',
      ],
      reviews: [],
      supportedTemplates: [4, 5],
   },
   {
      id: '5',
      title: 'RDR2',
      img: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png',
      genre: 'Western action-adventure',
      shortDescription:
         'America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed.',
      description:
         'After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.\n' +
         'From the creators of Grand Theft Auto V and Red Dead Redemption, Red Dead Redemption 2 is an epic tale of life in America at the dawn of the modern age. Out now on Playstation 4, Xbox One, PC, and Stadia.',
      gallery: [
         'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/01/21/c3f2f474-cc17-45df-883d-6008da02d792/red-dead-redemption-2-mysteries',
         'https://www.rtlnieuws.nl/sites/default/files/content/images/2018/09/27/rdr2_33_0.jpg?itok=HJ4SuKJE&width=1024&height=576&impolicy=semi_dynamic',
         'https://images.pushsquare.com/b24e81ed4c045/when-is-red-dead-redemption-2-set-playstation-4-ps4-1.large.jpg',
         'https://i.guim.co.uk/img/media/870ddad3caaae184e4ccf2e1c4e540e88a4d1fa7/114_0_3600_2160/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3e1a464eee023db6dc69688fbce58930',
         'https://assets-prd.ignimgs.com/2021/06/01/rdr2-pc-screenshot-023-1622555736386.jpg',
      ],
      reviews: [],
      supportedTemplates: [0, 1, 2, 6],
   },
   {
      id: '6',
      title: 'Stalker',
      img: 'https://s1.gaming-cdn.com/images/products/5376/orig-fallback-v1/s-t-a-l-k-e-r-2-heart-of-chornobyl-pc-game-steam-europe-cover.jpg',
      genre: 'First-person shooter',
      shortDescription:
         'Next-gen sequel to the award-winning PC game franchise developed by GSC Game World, set to deliver a unique action experience of survival in the post-apocalyptic Chornobyl Exclusion Zone.',
      description:
         'The Heart of Chornobyl has never been beating so loud as it is right now. The Zone is calling for stalkers, who are ready to delve into the non-linear journey through a sinister open world in the Eastern European post-apocalyptic setting.\n' +
         "S.T.A.L.K.E.R. 2: Heart of Chornobyl applies the full potential of Unreal Engine 5 as well as motion capture and photogrammetry technologies to provide you with benchmark-setting graphics and ultimate immersion into the game world. The advanced artificial intelligence system will compel the stalker to utilize a tactical approach against numerous enemies, challenging and keeping even the most hard-boiled players engaged. A-Life 2.0 life-simulating system builds a holistic live environment where player's actions have an impact on the world of the Zone.",
      gallery: [
         'https://cdn1.dotesports.com/wp-content/uploads/2021/12/17102346/Mqmjrg2PsRDuZ5LcFPRQwT-1200-80.jpg',
         'https://media.moddb.com/images/downloads/1/221/220428/preview_2.jpg',
         'https://cdn.akamai.steamstatic.com/steam/apps/1643320/ss_3b56a4aea69f1d49d4871eeb1913f460f067a138.1920x1080.jpg?t=1647860197',
         'https://pbs.twimg.com/media/FGJdb0zXMAELUqs?format=jpg&name=4096x4096',
         'https://www.moviesonline.ca/wp-content/uploads/2022/03/Stalker-2-Heart-of-Chernobyl-Work-has-stopped-1024x576.jpg',
      ],
      reviews: [],
      supportedTemplates: [4, 5, 6],
   },
   {
      id: '7',
      title: 'Metro 2033',
      img: 'https://image.api.playstation.com/cdn/EP4062/CUSA00591_00/o0nw1XsrxYS4wuug9cTqPFqPhRinf2zd.png',
      genre: 'First-person life simulation',
      shortDescription:
         "The story is based on Dmitry Glukhovsky's novel of the same name, where survivors of a nuclear war have taken refuge in the Metro tunnels of Moscow.",
      description:
         'The human and mutant enemies can be killed with a variety of firearms. The game features traditional guns like a revolver, assault rifles and shotguns, as well as more inventive weapons like a pneumatic crossbow. In firefights, human enemies take cover and flank the player, while mutant enemies stay in the open and try to bite them. Alternatively, the player can employ stealth to evade their enemies or kill them silently. This can be achieved by using a throwing knife to kill an enemy from afar, or shooting an enemy with a suppressed weapon.\n' +
         'Since the game has a large survival horror focus, the player often has little ammunition, and must scavenge for supplies from caches or dead bodies. An essential supply is pre-war 5.45×39mm ammunition (referred to in the game as "military grade ammunition"), which is also the main currency in the tunnels. This ammunition can be traded for weapons and upgrades, or used directly as stronger bullets than other scavenged ammunition.',
      gallery: [
         'https://tweakers.net/i/pBNMXCfIS_YKBuiCJsZAhF6Xnzc=/656x/filters:fill(white)/i/1260890169.jpeg?f=imagenormal',
         'https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/A6TU8H/941fc382ec364df8a1097a22a003097e.jpg/f/metro-2033-last-refuge.jpg?borderless=1&width=1920',
         'https://images.gog-statics.com/ea26264abdac34c725c52eae0210151197d13174b2987f0991a392b51133b66f_product_card_v2_mobile_slider_639.jpg',
         'https://cdn.pocket-lint.com/r/s/1200x630/assets/images/155109-games-news-metro-2033-is-available-for-free-today-image1-a8hggkenej.jpg',
         'https://assets2.rockpapershotgun.com/metro-2033-original.jpg/BROK/resize/1920/format/jpg/quality/80/metro-2033-original.jpg',
         'https://i.ytimg.com/vi/bwt-0dSRdEs/maxresdefault.jpg',
      ],
      reviews: [],
      supportedTemplates: [4, 5, 6],
   },
]
