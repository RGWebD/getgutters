import { siteImages, type SiteImage } from "@/lib/site-images";

export type AreaFaq = {
  question: string;
  answer: string;
};

export type CustomerReview = {
  name: string;
  quote: string;
};

export type LocalProjectPhoto = {
  image: SiteImage;
  alt: string;
  caption: string;
};

export type ServiceAreaContent = {
  slug: ServiceAreaSlug;
  name: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heroIntro: string;
  image: SiteImage;
  imageAlt: string;
  neighborhoods: string[];
  customerReview: CustomerReview;
  projectPhotos: LocalProjectPhoto[];
  overviewTitle: string;
  overview: string[];
  concernsTitle: string;
  concernsIntro: string;
  concerns: string[];
  localTitle: string;
  localCopy: string[];
  faqs: AreaFaq[];
  nearby: ServiceAreaSlug[];
};

export const serviceAreaSlugs = [
  "orange-park",
  "oakleaf-plantation",
  "lakeside",
  "fleming-island",
  "argyle-forest",
  "mandarin",
  "middleburg",
  "fruit-cove",
] as const;

export type ServiceAreaSlug = (typeof serviceAreaSlugs)[number];

export const serviceAreaPages: Record<ServiceAreaSlug, ServiceAreaContent> = {
  "orange-park": {
    slug: "orange-park",
    name: "Orange Park",
    title: "Gutter Services in Orange Park, FL",
    metaDescription:
      "Seamless gutter installation, repair, cleaning, guards, fascia, soffit, and downspouts in Orange Park, FL. Request a free estimate from Get Gutters.",
    eyebrow: "Orange Park Gutter Company",
    heroIntro:
      "Get Gutters is based in Orange Park and provides complete gutter services for nearby homes and commercial properties, from new seamless systems to repairs, cleaning, guards, and downspouts.",
    image: siteImages.heroTruck,
    imageAlt: "Get Gutters service truck and seamless gutter equipment",
    neighborhoods: ["Orange Park Country Club", "Loch Rane", "Grove Park", "Meadowbrook Terrace"],
    customerReview: {
      name: "Chris Kosicki",
      quote:
        "After a full roof replacement, I chose Pablo with Get Gutters to come in and replace all of my gutters.",
    },
    projectPhotos: [],
    overviewTitle: "Gutter work planned for Orange Park properties",
    overview: [
      "Heavy rain puts every part of a gutter system to work. The gutter runs need to collect water from the roof edge, corners and outlets need to stay controlled, and downspouts need to move that water away from the structure. A weakness in any one of those points can show up as overflow, staining, erosion, or water landing where it should not.",
      "Get Gutters evaluates the actual roofline and drainage path before recommending work. Depending on the condition of the property, that may mean custom seamless gutters formed on-site, a focused repair, cleaning, gutter guards, downspout improvements, or fascia and soffit work. The goal is a system that fits the home rather than a one-size-fits-all package.",
    ],
    concernsTitle: "Common gutter concerns in Orange Park",
    concernsIntro:
      "These are practical signs that the roof-drainage system should be inspected before the next stretch of hard rain.",
    concerns: [
      "Water spilling over gutters at roof valleys or long runs",
      "Leaking corners, separated joints, or stained fascia",
      "Sagging sections or gutters pulling away from the roofline",
      "Downspouts releasing water beside the foundation or walkways",
      "Leaves, pine needles, and roof debris slowing drainage",
      "Soft, damaged, or exposed fascia and soffit near the gutter line",
    ],
    localTitle: "Based in Orange Park and ready to assess the full system",
    localCopy: [
      "Get Gutters serves Orange Park from its Bowie Boulevard location. That local base makes Orange Park a core service area for estimates, installations, and follow-up work.",
      "During an estimate, the team can review the roof perimeter, high-flow areas, existing gutter condition, downspout placement, and visible drainage concerns. Homeowners receive a recommendation based on what is present at the property, including whether repair is reasonable or replacement should be considered.",
    ],
    faqs: [
      {
        question: "Does Get Gutters provide free estimates in Orange Park?",
        answer:
          "Yes. Orange Park homeowners and property managers can request a free estimate online or call or text (904) 589-0000 to discuss the property.",
      },
      {
        question: "Can you make seamless gutters at my Orange Park property?",
        answer:
          "Get Gutters uses a commercial K-style gutter machine to form continuous 6-inch aluminum gutter runs on-site for the planned roofline sections.",
      },
      {
        question: "Do I need gutter repair or full replacement?",
        answer:
          "That depends on the cause and extent of the problem. A limited leak, loose hanger, or damaged section may support a focused repair, while widespread deterioration or repeated failures may make replacement the better discussion.",
      },
    ],
    nearby: ["lakeside", "fleming-island", "oakleaf-plantation", "middleburg"],
  },
  "oakleaf-plantation": {
    slug: "oakleaf-plantation",
    name: "Oakleaf Plantation",
    title: "Gutter Services in Oakleaf Plantation, FL",
    metaDescription:
      "Gutter installation, cleaning, repair, guards, fascia, soffit, and downspout services in Oakleaf Plantation, FL. Get a free estimate from Get Gutters.",
    eyebrow: "Oakleaf Plantation Gutter Company",
    heroIntro:
      "Get Gutters helps Oakleaf Plantation property owners manage roof runoff with seamless gutter installation, repairs, cleaning, guards, downspouts, and roofline-related fascia and soffit work.",
    image: siteImages.work5,
    imageAlt: "Seamless gutter installation on a Northeast Florida home",
    neighborhoods: [
      "Eagle Landing",
      "Cannons Point",
      "Hearthstone",
      "Highland Mill",
      "Litchfield",
      "Nature's Hammock",
    ],
    customerReview: {
      name: "Mostafa Aboelsoud",
      quote:
        "The team was professional, punctual, and very knowledgeable. They took the time to explain their recommendations clearly.",
    },
    projectPhotos: [],
    overviewTitle: "Match the gutter system to the roofline",
    overview: [
      "Rooflines with multiple planes, valleys, garages, and covered entries can concentrate a large amount of water into a few sections during a downpour. Properly planned gutter runs and outlets help collect that flow and direct it away from walls, planting beds, driveways, and the foundation area.",
      "Get Gutters reviews the full water path before proposing work in Oakleaf Plantation. New installations are measured for the property and formed on-site in continuous 6-inch K-style sections. Existing systems can also be assessed for leaks, poor slope, loose attachment, debris buildup, undersized or damaged downspouts, and related fascia or soffit concerns.",
    ],
    concernsTitle: "When an Oakleaf Plantation gutter system needs attention",
    concernsIntro:
      "Visible symptoms often point to a specific capacity, attachment, debris, or discharge problem.",
    concerns: [
      "Overflow where two roof sections send water toward the same gutter run",
      "Water dropping near garage corners, entries, or foundation edges",
      "Loose hangers or a gutter line that no longer appears even",
      "Clogged outlets and downspouts after leaves or storm debris collect",
      "Leaking corners that leave streaks on the fascia or siding",
      "An existing system that does not cover the roof sections that need drainage",
    ],
    localTitle: "A complete roof-edge and drainage review",
    localCopy: [
      "A useful estimate goes beyond measuring linear feet. It should account for how the roof sheds water, where the highest-flow sections are, where downspouts can discharge, and whether the material behind the existing gutter is sound enough for secure attachment.",
      "Get Gutters can scope the work around the property's actual needs, whether that is a new seamless system, guards on a serviceable gutter, cleaning and inspection, isolated repair, additional downspouts, or fascia and soffit work discovered at the roof edge.",
    ],
    faqs: [
      {
        question: "What gutter services are available in Oakleaf Plantation?",
        answer:
          "Services include seamless gutter installation, gutter cleaning, gutter repair, gutter guards, fascia and soffit work, commercial gutters, and downspout installation.",
      },
      {
        question: "Can gutter guards help with leaves and roof debris?",
        answer:
          "Guards can reduce the amount of leaves, pine needles, and larger debris entering a sound gutter system. The existing gutters and drainage should be assessed first because guards do not correct poor pitch, damaged sections, or inadequate downspout placement.",
      },
      {
        question: "How do I request an Oakleaf Plantation estimate?",
        answer:
          "Use the free-estimate form or call or text Get Gutters at (904) 589-0000 with the property address and the problem you are seeing.",
      },
    ],
    nearby: ["argyle-forest", "orange-park", "lakeside", "middleburg"],
  },
  lakeside: {
    slug: "lakeside",
    name: "Lakeside",
    title: "Gutter Services in Lakeside, FL",
    metaDescription:
      "Lakeside, FL gutter installation, cleaning, repair, guards, fascia, soffit, and downspout services from Get Gutters. Call or request a free estimate.",
    eyebrow: "Lakeside Gutter Company",
    heroIntro:
      "Get Gutters serves Lakeside homes with custom seamless gutters and practical solutions for leaks, overflow, debris, damaged downspouts, and roofline drainage problems.",
    image: siteImages.work3,
    imageAlt: "Finished seamless gutter corner and downspout on a local home",
    neighborhoods: [
      "Foxridge",
      "Bear Run",
      "Tanglewood Village",
      "Ridgecrest",
      "Doctors Lake Estates",
    ],
    customerReview: {
      name: "Leslie Gregson",
      quote:
        "First thing I have to say about Pablo is he is honest and it was one of the reasons that we went with him.",
    },
    projectPhotos: [],
    overviewTitle: "Control runoff before it reaches the wrong place",
    overview: [
      "Gutters have a simple job, but every section has to work together. Water must enter the run, travel with the correct pitch, pass through an open outlet, and leave through a downspout that releases it in a sensible location. When one part is blocked, loose, damaged, or poorly placed, the visible problem may appear somewhere else along the system.",
      "For Lakeside properties, Get Gutters can inspect an existing system or plan a new one around the roof edge and discharge points. Continuous aluminum gutter runs are formed on-site for new installations. Repairs, cleaning, guards, downspout work, and fascia or soffit services can be scoped when those are the more appropriate needs.",
    ],
    concernsTitle: "Signs to check around a Lakeside home",
    concernsIntro:
      "Walk the property after a rain and look for evidence that water is escaping or draining poorly.",
    concerns: [
      "Mulch, soil, or landscaping washed out below the roof edge",
      "Dark streaks beneath a corner, end cap, or gutter seam",
      "Standing water or an obvious low spot in a gutter run",
      "Downspouts that are crushed, disconnected, or releasing water too close",
      "Debris visible above the gutter line or packed around an outlet",
      "Peeling paint, soft wood, or open gaps along fascia and soffit",
    ],
    localTitle: "Repair what is workable; replace what is not",
    localCopy: [
      "Not every gutter problem requires a full new system. If the surrounding gutter is serviceable, a loose hanger, damaged downspout, or limited leak may be repairable. If the run has widespread damage, poor alignment, repeated failures, or insufficient drainage capacity, replacement may deserve consideration.",
      "Get Gutters bases that conversation on the visible condition of the system. The estimate can separate immediate drainage problems from optional upgrades so the proposed work stays tied to the property.",
    ],
    faqs: [
      {
        question: "Does Get Gutters serve Lakeside, Florida?",
        answer:
          "Yes. Lakeside is within the Get Gutters service area for estimates and gutter-related work.",
      },
      {
        question: "Can you repair a sagging gutter section?",
        answer:
          "A sagging section can be assessed for loose hangers, damaged attachment points, poor pitch, or other underlying issues. Whether it should be reset, repaired, or replaced depends on the condition of that run and the fascia behind it.",
      },
      {
        question: "How often should gutters be cleaned in Lakeside?",
        answer:
          "There is no single schedule for every property. Roof shape, nearby trees, debris load, and whether guards are installed all affect timing. Overflow or visible debris means the system should be checked promptly.",
      },
    ],
    nearby: ["orange-park", "fleming-island", "oakleaf-plantation", "middleburg"],
  },
  "fleming-island": {
    slug: "fleming-island",
    name: "Fleming Island",
    title: "Gutter Services in Fleming Island, FL",
    metaDescription:
      "Seamless gutter installation, repairs, cleaning, guards, fascia, soffit, and downspouts in Fleming Island, FL. Request a Get Gutters estimate.",
    eyebrow: "Fleming Island Gutter Company",
    heroIntro:
      "Get Gutters provides Fleming Island homes and commercial properties with seamless gutter installation, repair, cleaning, guards, downspouts, and fascia and soffit services.",
    image: siteImages.work8,
    imageAlt: "Dark seamless gutters installed on a Northeast Florida home",
    neighborhoods: ["Eagle Harbor", "Pace Island", "Fleming Island Plantation"],
    customerReview: {
      name: "James",
      quote: "They were professional, efficient, and did a great job with the installation.",
    },
    projectPhotos: [],
    overviewTitle: "Plan for the water volume, not just the roof edge",
    overview: [
      "Long roof runs and concentrated valleys can move substantial water during a Florida storm. The gutter size, pitch, outlet locations, and downspout plan all affect whether that runoff stays controlled. A system can look complete from the ground and still struggle at its highest-flow points.",
      "Get Gutters measures the property and reviews how water should travel before recommending an installation or repair in Fleming Island. New 6-inch K-style gutter runs are formed on-site to fit the planned sections. Existing systems can be cleaned, repaired, fitted with guards when appropriate, or updated with downspout and roofline work based on their condition.",
    ],
    concernsTitle: "Drainage problems worth addressing",
    concernsIntro:
      "These symptoms can identify where the gutter or downspout system is losing control of runoff.",
    concerns: [
      "Overflow at inside corners or below a major roof valley",
      "Water collecting near patios, walkways, or the base of the home",
      "Loose gutters after wind or repeated heavy rain",
      "Corroded, dented, or separated downspout sections",
      "Frequent debris buildup that blocks outlets",
      "Fascia or soffit damage visible behind the gutter line",
    ],
    localTitle: "Gutter recommendations tied to the property",
    localCopy: [
      "The right plan may be a full-perimeter system, gutters only on selected roof sections, larger or additional downspouts, or a focused correction to an existing run. The useful answer comes from reviewing the property rather than prescribing the same layout everywhere.",
      "Get Gutters can explain which parts of the system appear serviceable, which concerns affect drainage now, and which additions are optional. That makes it easier to compare repair, replacement, and protection work on the same facts.",
    ],
    faqs: [
      {
        question: "Are seamless gutters available in Fleming Island?",
        answer:
          "Yes. Get Gutters forms continuous 6-inch K-style aluminum gutter runs on-site for the roofline sections included in the project.",
      },
      {
        question: "Can you add or replace downspouts?",
        answer:
          "Yes. Downspout installation and replacement can be planned around outlet capacity, the gutter layout, and where water can be directed away from the structure.",
      },
      {
        question: "Do you work on fascia and soffit as part of a gutter project?",
        answer:
          "Get Gutters provides fascia and soffit services. Any damaged roof-edge material affecting secure gutter attachment should be identified during the estimate and included only where needed.",
      },
    ],
    nearby: ["fruit-cove", "lakeside", "orange-park", "mandarin"],
  },
  "argyle-forest": {
    slug: "argyle-forest",
    name: "Argyle Forest",
    title: "Gutter Services in Argyle Forest, Jacksonville, FL",
    metaDescription:
      "Argyle Forest gutter installation, repair, cleaning, guards, fascia, soffit, and downspout services. Request a free estimate from Get Gutters.",
    eyebrow: "Argyle Forest Gutter Company",
    heroIntro:
      "Get Gutters serves Argyle Forest with seamless gutter systems and targeted work for overflow, leaks, loose sections, debris, downspouts, fascia, and soffit.",
    image: siteImages.work7,
    imageAlt: "Black seamless gutters installed on a brick home",
    neighborhoods: [
      "Chimney Lakes",
      "Highland Lakes",
      "Sturbridge Place",
      "WaterMill",
      "Argyle Forest East Village",
    ],
    customerReview: {
      name: "Liana Olson",
      quote: "Pablo, the owner, is incredibly reliable, honest, hard-working, and meticulous.",
    },
    projectPhotos: [],
    overviewTitle: "Give stormwater a controlled route off the roof",
    overview: [
      "Without a clear drainage path, roof runoff can land beside walls, wear channels into landscaping, splash across entries, and collect near the foundation area. Gutters and downspouts work best when their layout follows the roof's actual high-flow points and provides enough outlet capacity for the run.",
      "Get Gutters evaluates Argyle Forest properties for both new systems and existing gutter problems. The scope can include seamless 6-inch K-style installation, cleaning, leak or attachment repairs, gutter guards, downspout changes, commercial gutter work, and fascia or soffit service where the roof edge needs attention.",
    ],
    concernsTitle: "What to look for during the next hard rain",
    concernsIntro:
      "Rain often reveals the exact location of a gutter or drainage problem better than a dry-weather glance.",
    concerns: [
      "Sheets of water falling from a roof section with no gutter coverage",
      "Overflow even though the visible gutter run appears intact",
      "Water backing up where debris has blocked an outlet",
      "Loose fasteners, sagging sections, or gaps behind the gutter",
      "Downspouts emptying onto busy walkways or vulnerable planting areas",
      "Rot or exposed material at the fascia and soffit line",
    ],
    localTitle: "A measured plan for installation or repair",
    localCopy: [
      "A gutter estimate should identify more than product and color. It should explain which roof sections are included, how the system will move water, where the outlets and downspouts belong, and whether the roof edge is ready for secure installation.",
      "For an existing system, Get Gutters can evaluate whether the concern is isolated or part of a broader drainage problem. That distinction matters when choosing between cleaning, repair, added capacity, guards, or replacement.",
    ],
    faqs: [
      {
        question: "Does Get Gutters provide service in Argyle Forest?",
        answer:
          "Yes. Argyle Forest is one of the Jacksonville-area communities served by Get Gutters.",
      },
      {
        question: "Can gutters be added only where my home needs them?",
        answer:
          "A system can be planned around the roof sections and drainage concerns present at the property. The estimate should identify what is included and how those sections connect to the downspout plan.",
      },
      {
        question: "Will gutter guards stop every maintenance need?",
        answer:
          "No guard makes a drainage system maintenance-free. Guards can reduce debris entry, but the roof, guard surface, gutters, outlets, and downspouts should still be monitored and kept functional.",
      },
    ],
    nearby: ["oakleaf-plantation", "orange-park", "lakeside", "mandarin"],
  },
  mandarin: {
    slug: "mandarin",
    name: "Mandarin",
    title: "Gutter Services in Mandarin, Jacksonville, FL",
    metaDescription:
      "Mandarin gutter installation, cleaning, repair, guards, fascia, soffit, and downspout services from Get Gutters. Request a free local estimate.",
    eyebrow: "Mandarin Gutter Company",
    heroIntro:
      "Get Gutters helps Mandarin property owners keep roof runoff moving with seamless gutters, repairs, cleaning, guards, downspouts, and fascia and soffit services.",
    image: siteImages.work2,
    imageAlt: "Wrap-around seamless gutter installation on a local home",
    neighborhoods: ["Old Mandarin", "Loretto", "Beauclerc", "Losco", "Hartley", "Greenland"],
    customerReview: {
      name: "Kaila Mays",
      quote:
        "Very thorough and super nice and informative! You can tell he takes pride in his work.",
    },
    projectPhotos: [],
    overviewTitle: "Manage rain and recurring roof debris together",
    overview: [
      "Tree cover can add shade and character to a property, but leaves, pine needles, seed pods, and small roof debris can collect in gutters and around outlets. Once the water path narrows, a system may overflow even when the gutters themselves are otherwise sound.",
      "Get Gutters can assess both debris control and the underlying drainage design for Mandarin homes. Cleaning may restore flow, guards may reduce future debris entry on a suitable system, and repair may address a localized defect. Where the current layout or condition is no longer dependable, custom seamless gutters and a revised downspout plan can be considered.",
    ],
    concernsTitle: "Gutter and roofline issues common on tree-covered properties",
    concernsIntro:
      "The visible debris is only one part of the assessment; pitch, outlets, attachment, and discharge still matter.",
    concerns: [
      "Leaves or pine needles packed into gutters and outlet openings",
      "Water spilling behind or over a gutter during a storm",
      "Organic buildup holding moisture along the roof edge",
      "Loose sections that shift under the weight of water and debris",
      "Downspouts that clog, separate, or release water in the wrong location",
      "Fascia and soffit damage that must be addressed before secure attachment",
    ],
    localTitle: "Start with flow, then choose the right protection",
    localCopy: [
      "Gutter guards are most useful when the gutter beneath them is correctly pitched, securely attached, and connected to adequate outlets and downspouts. Installing protection over an unresolved drainage problem does not correct the cause.",
      "Get Gutters can first review the existing system, then explain whether cleaning, repair, guards, downspout work, or replacement fits the condition found at the Mandarin property. New gutters are formed on-site for the measured runs rather than transported as short joined sections.",
    ],
    faqs: [
      {
        question: "Does Get Gutters install gutter guards in Mandarin?",
        answer:
          "Yes. Guard options can be considered after the existing gutter condition, pitch, outlets, and downspouts are assessed.",
      },
      {
        question: "What causes gutters to overflow when they are not full of leaves?",
        answer:
          "Overflow can also come from poor pitch, a low spot, a blocked downspout, insufficient outlet capacity, a damaged section, or a roof valley sending more water into one point than the run can handle.",
      },
      {
        question: "Can you clean and inspect the system at the same visit?",
        answer:
          "Gutter cleaning includes clearing the system so its condition and water path can be evaluated more meaningfully. Any separate repair or replacement recommendation should be explained from what is found.",
      },
    ],
    nearby: ["fruit-cove", "fleming-island", "argyle-forest", "orange-park"],
  },
  middleburg: {
    slug: "middleburg",
    name: "Middleburg",
    title: "Gutter Services in Middleburg, FL",
    metaDescription:
      "Middleburg, FL seamless gutter installation, repairs, cleaning, guards, fascia, soffit, commercial gutters, and downspouts. Get a free estimate.",
    eyebrow: "Middleburg Gutter Company",
    heroIntro:
      "Get Gutters serves Middleburg properties with seamless gutter installation and repair-focused solutions for roof runoff, debris, downspouts, fascia, and soffit.",
    image: siteImages.work6,
    imageAlt: "Custom downspout routing beside a Northeast Florida patio",
    neighborhoods: ["Two Creeks", "Lake Asbury", "Pine Ridge", "Azalea Ridge", "The Ravines"],
    customerReview: {
      name: "JustCallMeRoy",
      quote:
        "Amazing attention to detail and great work was completed on time with no issues whatsoever.",
    },
    projectPhotos: [],
    overviewTitle: "Drainage planning for different property layouts",
    overview: [
      "Middleburg properties can have very different roof footprints and discharge conditions. A compact home in a neighborhood, a house on a larger lot, and a commercial building do not need the same gutter layout. Roof area, valleys, eaves, grade, paved surfaces, and the available discharge points all shape the plan.",
      "Get Gutters measures the actual structure before specifying new seamless runs or downspouts. Existing systems can be evaluated for repair, cleaning, debris protection, and roofline issues. The recommendation should address where water is escaping now and where it can be moved more safely.",
    ],
    concernsTitle: "Problems that can undermine drainage",
    concernsIntro:
      "A complete assessment follows water from the roof surface through the gutter and out at ground level.",
    concerns: [
      "Roof sections that shed water directly beside the home",
      "Long gutter runs with too few effective outlets",
      "Erosion or standing water around downspout discharge points",
      "Gutters bent or pulled loose by debris, ladders, or weather",
      "Leaking corners and end caps that repeatedly stain the roof edge",
      "Fascia deterioration that prevents a reliable gutter attachment",
    ],
    localTitle: "Size and route the system for the structure",
    localCopy: [
      "Continuous 6-inch K-style gutters can provide useful capacity, but size alone does not solve a poor drainage layout. The pitch, outlet count, downspout size, and discharge direction must work with the roof and property.",
      "Get Gutters can scope residential or commercial work in Middleburg and separate system repairs from full replacement. If fascia or soffit damage affects the work area, that condition can be identified and included in the estimate rather than hidden behind new gutter material.",
    ],
    faqs: [
      {
        question: "Does Get Gutters travel to Middleburg?",
        answer:
          "Yes. Middleburg is within the Get Gutters service area for residential and commercial gutter estimates.",
      },
      {
        question: "Do you install commercial gutters in Middleburg?",
        answer:
          "Get Gutters provides commercial gutter systems. The appropriate profile, capacity, outlet layout, and downspout plan depend on the building and should be measured on-site.",
      },
      {
        question: "Can downspouts be redirected away from problem areas?",
        answer:
          "Downspout placement and extensions can be reviewed when water is releasing beside the foundation, across a walkway, or into a vulnerable area. Any routing plan still needs a practical discharge location on the property.",
      },
    ],
    nearby: ["oakleaf-plantation", "lakeside", "orange-park", "fleming-island"],
  },
  "fruit-cove": {
    slug: "fruit-cove",
    name: "Fruit Cove",
    title: "Gutter Services in Fruit Cove, FL",
    metaDescription:
      "Fruit Cove gutter installation, repair, cleaning, guards, fascia, soffit, and downspout services. Call Get Gutters or request a free estimate online.",
    eyebrow: "Fruit Cove Gutter Company",
    heroIntro:
      "Get Gutters provides Fruit Cove homes with custom seamless gutters and service for leaks, debris, overflow, downspouts, gutter guards, fascia, and soffit.",
    image: siteImages.work4,
    imageAlt: "Precision gutter and fascia detail on a Northeast Florida home",
    neighborhoods: [
      "Julington Creek Plantation",
      "Durbin Crossing",
      "Cunningham Creek Plantation",
      "Johns Creek",
      "Bartram Plantation",
    ],
    customerReview: {
      name: "Hannah Hayes",
      quote:
        "We chose black gutters and it did not disappoint. Get gutters was so professional and kind.",
    },
    projectPhotos: [],
    overviewTitle: "Protect the roof edge and complete the drainage path",
    overview: [
      "A gutter system is only as dependable as the surfaces supporting it and the path carrying water away. Sound fascia supports secure attachment, the gutter collects and directs runoff, and the downspout completes the route. Damage or poor planning at any stage can leave water escaping beside the home.",
      "Get Gutters reviews that complete path for Fruit Cove properties. The team can fabricate new continuous 6-inch K-style gutter runs on-site, repair serviceable systems, clear debris, install guards where appropriate, improve downspouts, and address fascia or soffit work related to the roof edge.",
    ],
    concernsTitle: "Clues that the system is not keeping up",
    concernsIntro:
      "Some drainage failures are obvious during rain; others leave marks that remain after the storm passes.",
    concerns: [
      "Overflow below roof valleys or on long gutter sections",
      "Water marks on fascia, soffit, siding, or masonry",
      "Gutters that bow, sag, or separate from the roof edge",
      "Leaves and pine needles collecting faster than the outlets can clear",
      "Downspouts that terminate where water can return toward the home",
      "Wood damage or open seams visible behind an existing gutter",
    ],
    localTitle: "Coordinate gutters, downspouts, and roof-edge repairs",
    localCopy: [
      "Installing a new gutter over compromised attachment material can hide a problem without solving it. When the fascia or soffit around the work area is damaged, the estimate should make that condition visible and explain what needs to happen before or with the gutter installation.",
      "For a serviceable system, a narrower response may be enough. Get Gutters can assess whether cleaning, a repair, added downspout capacity, or gutter guards address the problem before recommending broader replacement.",
    ],
    faqs: [
      {
        question: "Is Fruit Cove in the Get Gutters service area?",
        answer:
          "Yes. Fruit Cove homeowners can request a free Get Gutters estimate online or call or text (904) 589-0000.",
      },
      {
        question: "Can damaged fascia be handled with a gutter project?",
        answer:
          "Get Gutters provides fascia and soffit services. The affected area should be inspected so the scope distinguishes damaged material from sound attachment surfaces.",
      },
      {
        question: "Are 6-inch gutters always the right answer?",
        answer:
          "Get Gutters installs 6-inch K-style gutters, but performance also depends on the layout, pitch, outlets, downspouts, and discharge plan. The roofline still needs to be measured and the water path planned for the property.",
      },
    ],
    nearby: ["mandarin", "fleming-island", "lakeside", "orange-park"],
  },
};

export function getServiceArea(slug: ServiceAreaSlug) {
  return serviceAreaPages[slug];
}

export function buildServiceAreaHead(area: ServiceAreaContent) {
  const url = `https://getguttersjax.com/areas/${area.slug}`;
  const businessId = "https://getguttersjax.com/#business";

  return {
    meta: [
      { title: `${area.title} | Get Gutters` },
      { name: "description", content: area.metaDescription },
      { property: "og:title", content: `${area.title} | Get Gutters` },
      { property: "og:description", content: area.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      {
        property: "og:image",
        content: "https://getguttersjax.com/images/get-gutters-social.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${area.title} | Get Gutters` },
      { name: "twitter:description", content: area.metaDescription },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Gutter Services in ${area.name}, Florida`,
          serviceType: "Gutter installation, repair, cleaning, and protection",
          url,
          provider: {
            "@type": "HomeAndConstructionBusiness",
            "@id": businessId,
            name: "Get Gutters",
            url: "https://getguttersjax.com/",
            telephone: "+1-904-589-0000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "585 Bowie Blvd",
              addressLocality: "Orange Park",
              addressRegion: "FL",
              postalCode: "32073",
              addressCountry: "US",
            },
          },
          areaServed: {
            "@type": "Place",
            name: `${area.name}, Florida`,
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Gutter services available in ${area.name}`,
            itemListElement: [
              "Seamless Gutter Installation",
              "Gutter Repair",
              "Gutter Cleaning",
              "Gutter Guards",
              "Fascia and Soffit",
              "Commercial Gutters",
              "Downspout Installation",
            ].map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: area.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://getguttersjax.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Service Areas",
              item: "https://getguttersjax.com/#areas",
            },
            { "@type": "ListItem", position: 3, name: area.name, item: url },
          ],
        }),
      },
    ],
  };
}
