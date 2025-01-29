const us = [
  // USA
  {
    id: 31,
    name: "Statue of Liberty",
    country: "USA",
    category: "Landmark",
    tags: ["historical", "symbol", "UNESCO"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor, a symbol of freedom and democracy.",
    similarPlaces: [
      "Ellis Island",
      "Brooklyn Bridge",
      "One World Trade Center",
    ],
  },
  {
    id: 32,
    name: "Golden Gate Bridge",
    country: "USA",
    category: "Architecture",
    tags: ["iconic", "suspension bridge", "scenic"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "An iconic suspension bridge connecting San Francisco to Marin County, known for its stunning views.",
    similarPlaces: ["Alcatraz Island", "Fisherman's Wharf", "Coit Tower"],
  },
  {
    id: 33,
    name: "Mount Rushmore",
    country: "USA",
    category: "Monument",
    tags: ["historical", "sculpture", "national memorial"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "Features the sculpted heads of four U.S. presidents carved into granite in South Dakota.",
    similarPlaces: [
      "Crazy Horse Memorial",
      "Badlands National Park",
      "Custer State Park",
    ],
  },
  {
    id: 34,
    name: "Grand Canyon",
    country: "USA",
    category: "Nature",
    tags: ["canyon", "national park", "scenic"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "One of the world’s most awe-inspiring natural wonders located in Arizona.",
    similarPlaces: ["Antelope Canyon", "Sedona", "Zion National Park"],
  },
  {
    id: 35,
    name: "White House",
    country: "USA",
    category: "Government",
    tags: ["historical", "residence", "symbol"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "The official residence and workplace of the President of the United States in Washington D.C.",
    similarPlaces: [
      "Capitol Building",
      "Lincoln Memorial",
      "Washington Monument",
    ],
  },

  // Germany
  {
    id: 36,
    name: "Brandenburg Gate",
    country: "Germany",
    category: "Landmark",
    tags: ["historical", "symbol", "architecture"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "An 18th-century neoclassical monument in Berlin symbolizing peace and unity.",
    similarPlaces: ["Berlin Wall", "Reichstag Building", "Potsdamer Platz"], // Added similar places
  },
  {
    id: 37,
    name: "Neuschwanstein Castle",
    country: "Germany",
    category: "Architecture",
    tags: ["castle", "fairytale", "tourist attraction"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A picturesque castle in Bavaria known for its romantic architecture.",
    similarPlaces: [
      "Hohenzollern Castle",
      "Linderhof Palace",
      "Schloss Nymphenburg",
    ], // Added similar places
  },
  {
    id: 38,
    name: "Cologne Cathedral",
    country: "Germany",
    category: "Architecture",
    tags: ["gothic", "UNESCO", "landmark"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A stunning example of Gothic architecture and a UNESCO World Heritage Site.",
    similarPlaces: [
      "Dresden Frauenkirche",
      "St. Stephen's Cathedral",
      "Hamburg's Elbphilharmonie",
    ], // Added similar places
  },
  {
    id: 39,
    name: "Berlin Wall Memorial",
    country: "Germany",
    category: "Historical Site",
    tags: ["memorial", "history", "landmark"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A preserved section of the Berlin Wall that commemorates the division of East and West Berlin.",
    similarPlaces: [
      "Checkpoint Charlie",
      "East Side Gallery",
      "Topography of Terror",
    ], // Added similar places
  },
  {
    id: 40,
    name: "Oktoberfest",
    country: "Germany",
    category: "Festival",
    tags: ["cultural", "beer festival", "tradition"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "The world's largest beer festival held annually in Munich celebrating Bavarian culture.",
    similarPlaces: [
      "Stuttgart Beer Festival",
      "Berlin Beer Week",
      "Rheingau Wine Festival",
    ], // Added similar places
  },

  // Australia
  {
    id: 41,
    name: "Sydney Opera House",
    country: "Australia",
    category: "Architecture",
    tags: ["iconic", "performing arts", "UNESCO"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A multi-venue performing arts center known for its unique shell-like design.",
    similarPlaces: [
      "Sydney Harbour Bridge",
      "Royal Botanic Garden",
      "Art Gallery of New South Wales",
    ], // Added similar places
  },
  {
    id: 42,
    name: "Great Barrier Reef",
    country: "Australia",
    category: "Nature",
    tags: ["coral reef", "marine life", "UNESCO"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "The world's largest coral reef system located off the coast of Queensland.",
    similarPlaces: [
      "Whitsunday Islands",
      "Daintree Rainforest",
      "Fraser Island",
    ], // Added similar places
  },
  {
    id: 43,
    name: "Uluru (Ayers Rock)",
    country: "Australia",
    category: "Natural Landmark",
    tags: ["sacred site", "geology", "UNESCO"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A massive sandstone monolith in the heart of the Northern Territory's arid 'Red Centre.'",
    similarPlaces: [
      "Kata Tjuta (The Olgas)",
      "Kings Canyon",
      "Alice Springs Desert Park",
    ], // Added similar places
  },
  {
    id: 44,
    name: "Bondi Beach",
    country: "Australia",
    category: "Beach",
    tags: ["surfing", "leisure", "iconic"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A famous beach in Sydney known for its surf culture and vibrant atmosphere.",
    similarPlaces: ["Manly Beach", "Coogee Beach", "Cronulla Beach"], // Added similar places
  },
  {
    id: 45,
    name: "Daintree Rainforest",
    country: "Australia",
    category: "Nature",
    tags: ["rainforest", "biodiversity", "UNESCO"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "One of the oldest rainforests in the world located in Queensland with rich biodiversity.",
    similarPlaces: [
      "Cape Tribulation",
      "Kuranda Rainforest Village",
      "Atherton Tablelands",
    ], // Added similar places
  },

  // Canada
  {
    id: 46,
    name: "CN Tower",
    country: "Canada",
    category: "Landmark",
    tags: ["tower", "observation", "iconic"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A communications and observation tower in Toronto recognized as one of the tallest freestanding structures in the world.",
    similarPlaces: [
      "Toronto Islands",
      "Royal Ontario Museum",
      "Ripley's Aquarium",
    ], // Added similar places
  },
  {
    id: 47,
    name: "Banff National Park",
    country: "Canada",
    category: "Nature",
    tags: ["national park", "mountains", "scenic"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "Canada’s first national park located in the Rocky Mountains known for its stunning landscapes and outdoor activities.",
    similarPlaces: [
      "Jasper National Park",
      "Yoho National Park",
      "Kootenay National Park",
    ], // Added similar places
  },
  {
    id: 48,
    name: "Niagara Falls",
    country: "Canada",
    category: "Natural Wonder",
    tags: ["waterfall ", "scenic ", "tourist attraction"],
    image: "https://dummyimage.com/600x400/000/fff",
    desc: "A group of three waterfalls located on the border between Canada and the USA known for their beauty and power.",
    similarPlaces: ["Victoria Falls ", "Iguazu Falls ", "Angel Falls"], // Added similar places
  },
  {
    id: 49,
    name: "Parliament Hill ",
    country: "Canada ",
    category: "Government ",
    tags: ["historical site ", "architecture"],
    image: "https://dummyimage.com/600x400/000/fff ",
    desc: "The seat of Canada's federal government located in Ottawa featuring stunning Gothic Revival architecture.",
    similarPlaces: [
      "Rideau Hall ",
      "National Gallery of Canada ",
      "Canadian Museum of History",
    ], // Added similar places
  },
  {
    id: 50,
    name: "Old Quebec City ",
    country: "Canada ",
    category: "Historical Site ",
    tags: ["UNESCO World Heritage Site"],
    image: "https://dummyimage.com/600x400/000/fff ",
    desc: "A historic district featuring cobblestone streets and well-preserved buildings from the French colonial era.",
    similarPlaces: [
      "Montreal Old Port ",
      "Quebec Citadel ",
      "Château Frontenac",
    ], // Added similar places
  },
];

export default us;
