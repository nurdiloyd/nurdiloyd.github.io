/*
 * Site content. Edit this file to add projects or releases; the pages render from it.
 *
 * Project fields:
 *   slug          URL name; the project page lives at /projects/<slug>/
 *   name, kind ("macOS app", "Unity package", …), year, summary, links[{ label, url }]
 *   logo          optional square image, e.g. "/images/logos/<slug>.png";
 *                 projects without one get a default logo with their initial
 *   pixelLogo     optional true for pixel-art logos, keeps them sharp when scaled
 *   details[]     optional bullet points shown on the project page
 *   media[]       optional, shown on the project page:
 *                   { type: "image", src, alt, width, height }   (width/height optional)
 *                   { type: "youtube", id, title }
 *
 *   To add a page for a new project, copy a folder in /projects, rename it to the
 *   new slug, and change data-project, <title> and the description in its index.html.
 *
 * Release fields:
 *   date ("YYYY-MM-DD"), project (same as the project's name), version, url
 *   status (optional): "upcoming" lists it first with a "Soon" label.
 *   For upcoming releases, date can be any text, e.g. "Q1 2027" or "December 2026".
 */

window.SITE_DATA = {
  projects: [
    {
      slug: "ghost-engine",
      name: "Ghost Engine",
      kind: "macOS app",
      year: "2026",
      summary:
        "A macOS game editor with an AI built in. Describe a game in one sentence, and a few minutes later you are playing it.",
      details: [
        "Chat with the Architect (Claude): it writes the scene and C++ gameplay code, builds it and presses Play",
        "Tests its own work: plays the game, checks the frames and the log, and fixes build errors",
        "Edit by hand too, with Scene and Game views, Hierarchy, Inspector, gizmos and undo, even for a whole AI turn",
        "Path tracing on Apple silicon",
        "Exports games as standalone Mac apps",
        "In beta, for macOS 26 or later, running on your own Anthropic API key"
      ],
      links: [
        { label: "itch.io", url: "https://nurdi21.itch.io/ghost-engine" }
      ],
      media: [
        { type: "youtube", id: "hDC25CfawQE", title: "Ghost Engine demo" },
        { type: "image", src: "/images/projects/ghost-engine-1.jpg", alt: "Ghost Engine screenshot", width: 1920, height: 1080 },
        { type: "image", src: "/images/projects/ghost-engine-2.jpg", alt: "Ghost Engine screenshot", width: 1920, height: 1080 },
        { type: "image", src: "/images/projects/ghost-engine-3.jpg", alt: "Ghost Engine screenshot", width: 1920, height: 1080 }
      ]
    },
    {
      slug: "find-the-cat-nightmare",
      logo: "/images/logos/find-the-cat-nightmare.jpg",
      name: "Find The Cat: Nightmare",
      kind: "Game",
      year: "2026",
      summary:
        "Cute cats, eerie places. A hand-drawn hidden object game set in retro-dystopian landscapes, where you find cats hidden among the static and rust.",
      details: [
        "Hand-drawn hidden object game",
        "Retro-futuristic, 80s-inspired setting: rusted machines, buzzing neons and broken arcade cabinets",
        "Single-player, for Windows and macOS",
        "Available in 10 languages, including English, Japanese and Turkish"
      ],
      links: [{ label: "Steam", url: "https://store.steampowered.com/app/3777700/Find_The_Cat_Nightmare/" }],
      media: [
        { type: "image", src: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3777700/401d7909e8438a4d7324d6d6b4b9c5f8ba708cac/ss_401d7909e8438a4d7324d6d6b4b9c5f8ba708cac.1920x1080.jpg", alt: "Find The Cat: Nightmare screenshot", width: 1920, height: 1080 },
        { type: "image", src: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3777700/6ab6eb48ebd39ba01883efa1a22ddd6e62bbfda0/ss_6ab6eb48ebd39ba01883efa1a22ddd6e62bbfda0.1920x1080.jpg", alt: "Find The Cat: Nightmare screenshot", width: 1920, height: 1080 },
        { type: "image", src: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3777700/1fb978664bb05e8a862654625db178120199b05c/ss_1fb978664bb05e8a862654625db178120199b05c.1920x1080.jpg", alt: "Find The Cat: Nightmare screenshot", width: 1920, height: 1080 },
        { type: "image", src: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3777700/f5939eb97ca0956d0053dcdcc2650901e4c4d331/ss_f5939eb97ca0956d0053dcdcc2650901e4c4d331.1920x1080.jpg", alt: "Find The Cat: Nightmare screenshot", width: 1920, height: 1080 },
        { type: "image", src: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3777700/81e995a25aebbdc98d555a8d22daa82e83d27fd2/ss_81e995a25aebbdc98d555a8d22daa82e83d27fd2.1920x1080.jpg", alt: "Find The Cat: Nightmare screenshot", width: 1920, height: 1080 }
      ]
    },
    {
      slug: "turkish-games-connect",
      logo: "/images/logos/turkish-games-connect.png",
      name: "TurkishGamesConnect",
      kind: "Website",
      year: "2026",
      summary:
        "A curated gallery of Turkish video games on Steam, from indies to big hits, with what's just released and what's coming soon.",
      details: [
        "More than 90 Turkish games in one gallery",
        "Recently released and coming soon sections",
        "Search across the whole gallery",
        "Every game links to its Steam page, so visitors can wishlist it"
      ],
      links: [{ label: "Website", url: "https://turkishgamesconnect.com/" }],
      media: [
        { type: "image", src: "/images/projects/turkish-games-connect.jpg", alt: "TurkishGamesConnect home page", width: 1440, height: 900 }
      ]
    },
    {
      slug: "cactus",
      logo: "/images/logos/cactus.png",
      name: "Cactus",
      kind: "macOS app",
      year: "2024",
      summary:
        "The simplest mind map for macOS. Multiple boards, connected nodes, child nodes, image attachments, and a flash card view for revising what you mapped.",
      details: [
        "Create and manage multiple boards",
        "Add and connect nodes, and expand ideas with child nodes",
        "Attach images to nodes",
        "Flash card view",
        "Export and import boards"
      ],
      links: [
        { label: "Mac App Store", url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12" },
        { label: "Source", url: "https://github.com/nurdiloyd/Project-Mind" }
      ],
      media: [
        { type: "image", src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/27/b9/ae/27b9aee1-95db-472a-e94c-b13ea41bfe1a/b6454c16-b48d-4311-b0ad-e78400e1094b_Cactus_v0.99_SS_-_4.png/800x500bb.jpg", alt: "Cactus screenshot", width: 800, height: 500 },
        { type: "image", src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/7b/8f/f2/7b8ff2ed-dec6-19f6-66ad-2489e519eff9/31a3d116-133d-4bb3-b66b-17b7c5c93a8d_Cactus_v0.99_SS_-_3.png/800x500bb.jpg", alt: "Cactus screenshot", width: 800, height: 500 },
        { type: "image", src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f3/df/0b/f3df0b08-a58a-0fe5-7cf9-6b2f00267853/d9adbd3f-6bb3-4277-bd51-e6f57d46b30e_Cactus_v0.99_SS_-_5.png/800x500bb.jpg", alt: "Cactus screenshot", width: 800, height: 500 },
        { type: "image", src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/2a/88/72/2a8872f4-0928-740f-28d4-493e4b3b5609/d36e2eba-6b0f-4ed1-88a9-1e57f2f96285_Cactus_v0.99_SS_-_2.png/800x500bb.jpg", alt: "Cactus screenshot", width: 800, height: 500 },
        { type: "image", src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b2/d1/ed/b2d1edfd-825b-9d37-0d36-c929e993ec6a/ad3b1976-a614-437a-aaa2-47b9bed620d2_Cactus_v0.99_SS_-_6.png/800x500bb.jpg", alt: "Cactus screenshot", width: 800, height: 500 }
      ]
    },
    {
      slug: "project-g",
      logo: "/images/logos/project-g.png",
      pixelLogo: true,
      name: "Project-G",
      kind: "Game",
      year: "2020",
      summary: "Our graduation project: a game built in Unity.",
      links: [
        { label: "Gameplay video", url: "https://www.youtube.com/watch?v=Hc5s4Rs0VGI" },
        { label: "Extra video", url: "https://www.youtube.com/watch?v=NvM6EtfrpCw" },
        { label: "GitHub", url: "https://github.com/nurdiloyd/Project-G" }
      ],
      media: [
        { type: "youtube", id: "Hc5s4Rs0VGI", title: "Project-G gameplay video" },
        { type: "youtube", id: "NvM6EtfrpCw", title: "Project-G extra video" }
      ]
    },
    {
      slug: "break-mesh",
      name: "Break Mesh",
      kind: "Unity package",
      year: "2021",
      summary: "A tiny Unity package for breaking a mesh into pieces.",
      links: [{ label: "GitHub", url: "https://github.com/nurdiloyd/Unity-MiniPackage-BreakMesh" }]
    }
  ],

  releases: [
    // Example of an upcoming release:
    // { date: "2026-12", project: "My Next Game", version: "1.0", url: "https://…", status: "upcoming" },
    {
      date: "2026-10-25",
      project: "Ghost Engine",
      version: "Beta",
      url: "https://nurdi21.itch.io/ghost-engine"
    },
    {
      date: "2026-03-09",
      project: "Find The Cat: Nightmare",
      version: "Launch",
      url: "https://store.steampowered.com/app/3777700/Find_The_Cat_Nightmare/"
    },
    {
      date: "2024-08-21",
      project: "Cactus",
      version: "0.99.1",
      url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12"
    },
    {
      date: "2024-07-17",
      project: "Cactus",
      version: "Launch",
      url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12"
    },
    {
      date: "2020-07-30",
      project: "Project-G",
      version: "1.0",
      url: "https://github.com/nurdiloyd/Project-G/releases/tag/v1.0"
    }
  ]
};
