/*
 * Site content. Edit this file to add projects or releases; the page renders from it.
 *
 * Project fields:
 *   name, kind, year, summary, stack[], links[{ label, url }]
 *   media (optional): { type: "image", src, alt }  shown on hover / when opened
 *
 * Release fields:
 *   date ("YYYY-MM-DD"), project, version, notes, url
 *   status (optional): "upcoming" puts it under "Next up" with a "Soon" label.
 *   For upcoming releases, date can be an approximate string like "2026-12" or "Q1 2027".
 */

window.SITE_DATA = {
  projects: [
    {
      name: "Cactus",
      kind: "macOS app",
      year: "2024",
      summary:
        "The simplest mind map for macOS. Multiple boards, connected nodes, child nodes, image attachments, and a flash card view for revising what you mapped.",
      stack: ["Swift", "macOS"],
      links: [
        { label: "Mac App Store", url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12" },
        { label: "Source", url: "https://github.com/nurdiloyd/Project-Mind" }
      ],
      media: {
        type: "image",
        src: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/dc/4b/62/dc4b6280-a86a-5942-1920-8018a8efe72d/AppIcon-0-0-85-220-0-4-0-2x-P3.png/512x512bb.png",
        alt: "Cactus app icon",
        contain: true
      }
    },
    {
      name: "SlingShot",
      kind: "Unity package",
      year: "2020",
      summary:
        "A physics-based slingshot mechanic for Unity, in both 3D and 2D. Pull back, aim, release.",
      stack: ["Unity", "C#", "Physics"],
      links: [
        { label: "GitHub", url: "https://github.com/nurdiloyd/Unity-MiniPackage-SlingShot" },
        { label: "v1.1", url: "https://github.com/nurdiloyd/Unity-MiniPackage-SlingShot/releases/tag/v1.1" }
      ],
      media: {
        type: "image",
        src: "https://raw.githubusercontent.com/nurdiloyd/Unity-MiniPackage-SlingShot/HEAD/Package-SlingShot/Recordings/movie_005.gif",
        alt: "SlingShot mechanic in action"
      }
    },
    {
      name: "Radial Menu UI",
      kind: "Unity package",
      year: "2021",
      summary: "A small Unity package that brings radial (pie) menus to the UI.",
      stack: ["Unity", "C#", "UI"],
      links: [
        { label: "GitHub", url: "https://github.com/nurdiloyd/Unity-MiniPackage-RadialMenuUI" },
        { label: "v1.0", url: "https://github.com/nurdiloyd/Unity-MiniPackage-RadialMenuUI/releases/tag/v1.0" }
      ]
    },
    {
      name: "Project-G",
      kind: "Game",
      year: "2020",
      summary: "My graduation project: a game built in Unity.",
      stack: ["Unity", "C#", "Game design"],
      links: [
        { label: "Gameplay video", url: "https://www.youtube.com/watch?v=Hc5s4Rs0VGI" },
        { label: "Extra video", url: "https://www.youtube.com/watch?v=NvM6EtfrpCw" },
        { label: "GitHub", url: "https://github.com/nurdiloyd/Project-G" }
      ],
      media: {
        type: "image",
        src: "https://i.ytimg.com/vi/Hc5s4Rs0VGI/hqdefault.jpg",
        alt: "Project-G gameplay video thumbnail"
      }
    },
    {
      name: "Break Mesh",
      kind: "Unity package",
      year: "2021",
      summary: "A tiny Unity package for breaking a mesh into pieces.",
      stack: ["Unity", "C#", "Meshes"],
      links: [{ label: "GitHub", url: "https://github.com/nurdiloyd/Unity-MiniPackage-BreakMesh" }]
    },
    {
      name: "FaceMorphine",
      kind: "Computer vision",
      year: "2019",
      summary:
        "Morphs one face into another: facial landmarks, human-to-cat landmark mapping, Delaunay triangulation, then the morph itself.",
      stack: ["Python", "OpenCV", "dlib"],
      links: [{ label: "GitHub", url: "https://github.com/nurdiloyd/FaceMorphine" }],
      media: {
        type: "image",
        src: "https://raw.githubusercontent.com/nurdiloyd/FaceMorphine/HEAD/Results/three_del.jpg",
        alt: "Delaunay triangulation over three faces"
      }
    },
    {
      name: "Image Processing",
      kind: "Computer vision",
      year: "2019",
      summary:
        "Segment-aware colour manipulation and histogram matching on image sequences from the DAVIS segmentation dataset.",
      stack: ["Python", "NumPy"],
      links: [{ label: "GitHub", url: "https://github.com/nurdiloyd/image_processing" }]
    }
  ],

  releases: [
    // Example of an upcoming release:
    // { date: "2026-12", project: "My Next Game", version: "1.0", notes: "Launch on Steam.", url: "https://…", status: "upcoming" },
    {
      date: "2024-08-21",
      project: "Cactus",
      version: "0.99.1",
      notes: "Flash card view, board export and import, UI and performance updates.",
      url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12"
    },
    {
      date: "2024-07-17",
      project: "Cactus",
      version: "Launch",
      notes: "First release on the Mac App Store.",
      url: "https://apps.apple.com/ca/app/cactus-simplest-mind-map/id6550895718?mt=12"
    },
    {
      date: "2021-01-28",
      project: "Radial Menu UI",
      version: "1.0",
      notes: "First release of the radial menu package.",
      url: "https://github.com/nurdiloyd/Unity-MiniPackage-RadialMenuUI/releases/tag/v1.0"
    },
    {
      date: "2021-01-04",
      project: "SlingShot",
      version: "1.1",
      notes: "Works with objects of different masses.",
      url: "https://github.com/nurdiloyd/Unity-MiniPackage-SlingShot/releases/tag/v1.1"
    },
    {
      date: "2020-12-21",
      project: "SlingShot",
      version: "1.0",
      notes: "First release: 3D and 2D physics slingshot.",
      url: "https://github.com/nurdiloyd/Unity-MiniPackage-SlingShot/releases/tag/v1.0"
    },
    {
      date: "2020-07-30",
      project: "Project-G",
      version: "1.0",
      notes: "Graduation project build.",
      url: "https://github.com/nurdiloyd/Project-G/releases/tag/v1.0"
    }
  ]
};
