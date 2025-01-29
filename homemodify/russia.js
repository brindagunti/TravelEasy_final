const rus = [
  {
    id: 21,
    name: "Red Square",
    country: "Russia",
    category: "Architecture",
    tags: ["historical", "landmark", "UNESCO"],
    image: "https://bridgetomoscow.com/files/200/3474.jpg",
    desc: "Red Square is a famous city square in Moscow, known for its historical significance and as a UNESCO World Heritage Site. It is surrounded by iconic buildings like the Kremlin and Saint Basil's Cathedral.",
    similarPlaces: ["Kremlin", "Saint Basil's Cathedral", "GUM"],
  },
  {
    id: 22,
    name: "The Kremlin",
    country: "Russia",
    category: "History",
    tags: ["fortress", "government", "architecture"],
    image:
      "https://plus.unsplash.com/premium_photo-1661964173407-af6b43f880df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEtyZW1saW58ZW58MHx8MHx8fDA%3D",
    desc: "The Kremlin is a fortified complex in the heart of Moscow, serving as the official residence of the President of Russia. It features stunning architecture and rich history.",
    similarPlaces: ["Red Square", "Saint Basil's Cathedral", "Bolshoi Theatre"],
  },
  {
    id: 23,
    name: "Saint Basil's Cathedral",
    country: "Russia",
    category: "Architecture",
    tags: ["cathedral", "onion domes", "iconic"],
    image:
      "https://media.istockphoto.com/id/621235832/photo/autumn-morning-at-the-cathedral.webp?a=1&b=1&s=612x612&w=0&k=20&c=485x4KA8RK16KBLZ9guGwD_kc-BThICOuA_k_YzkbWo=",
    desc: "Saint Basil's Cathedral is an iconic symbol of Russia, known for its colorful onion domes. It was built in the 16th century and is located on Red Square.",
    similarPlaces: ["Red Square", "Kremlin", "Moscow State University"],
  },
  {
    id: 24,
    name: "Hermitage Museum",
    country: "Russia",
    category: "Culture",
    tags: ["museum", "art", "history"],
    image:
      "https://images.unsplash.com/photo-1559683907-5e9549adad37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVybWl0YWdlJTIwTXVzZXVtfGVufDB8fDB8fHww",
    desc: "The Hermitage Museum in Saint Petersburg is one of the largest and oldest museums in the world, housing an extensive collection of art and cultural artifacts.",
    similarPlaces: ["Winter Palace", "Russian Museum", "Peterhof Palace"],
  },
  {
    id: 25,
    name: "Lake Baikal",
    country: "Russia",
    category: "Nature",
    tags: ["lake", "deepest", "scenic"],
    image:
      "https://images.unsplash.com/photo-1576151924516-8f03d28f773f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TGFrZSUyMEJhaWthbHxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Lake Baikal is the world's deepest and oldest freshwater lake, known for its stunning natural beauty and diverse wildlife. It is a UNESCO World Heritage Site.",
    similarPlaces: ["Listvyanka", "Olkhon Island", "Irkutsk"],
  },
  {
    id: 26,
    name: "Peterhof Palace",
    country: "Russia",
    category: "Architecture",
    tags: ["palace", "gardens", "UNESCO"],
    image:
      "https://images.unsplash.com/photo-1610197361600-33a3a5073cad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGV0ZXJob2YlMjBQYWxhY2V8ZW58MHx8MHx8fDA%3D",
    desc: "Peterhof Palace, often referred to as the 'Russian Versailles', is famous for its beautiful gardens and fountains. It was commissioned by Peter the Great in the early 18th century.",
    similarPlaces: ["Catherine Palace", "Tsarskoye Selo", "Summer Garden"], // Added similar places
  },
  {
    id: 27,
    name: "Catherine Palace",
    country: "Russia",
    category: "History",
    tags: ["palace", "baroque", "heritage"],
    image:
      "https://plus.unsplash.com/premium_photo-1661962571049-792ae9be2d79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2F0aGVyaW5lJTIwUGFsYWNlfGVufDB8fDB8fHww",
    desc: "Catherine Palace is a stunning example of Baroque architecture located near Saint Petersburg. It was the summer residence of the Russian tsars and features opulent interiors.",
    similarPlaces: ["Peterhof Palace", "Summer Palace", "Mikhailovsky Castle"], // Added similar places
  },
  {
    id: 28,
    name: "Trans-Siberian Railway",
    country: "Russia",
    category: "Adventure",
    tags: ["train journey", "scenic", "historic"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/VL_85-022_container_train.jpg/450px-VL_85-022_container_train.jpg",
    desc: "The Trans-Siberian Railway is one of the longest railway lines in the world, connecting Moscow to Vladivostok. It offers breathtaking views of Russia's diverse landscapes.",
    similarPlaces: ["Baikal-Amur Mainline", "Siberian Railway", "Golden Ring"], // Added similar places
  },
  {
    id: 29,
    name: "Kizhi Island",
    country: "Russia",
    category: "Culture",
    tags: ["UNESCO", "wooden architecture"],
    image:
      "https://lh5.googleusercontent.com/p/AF1QipN3rz6XicoDAlimkWRN_DPuaUZ5-zPc5yaryuq2=w675-h390-n-k-no",
    desc: "Kizhi Island is renowned for its unique wooden architecture, including the famous Church of the Transfiguration. It is a UNESCO World Heritage Site located on Lake Onega.",
    similarPlaces: ["Solovetsky Islands", "Valaam Monastery", "Kizhi Pogost"], // Added similar places
  },
  {
    id: 30,
    name: "Sochi",
    country: "Russia",
    category: "Nature",
    tags: ["beach", "resort", "Black Sea"],
    image:
      "https://images.unsplash.com/photo-1567245597540-5232c358e457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U29jaGklMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Sochi is a popular resort city on the Black Sea, known for its beaches, mild climate, and as a host city for the Winter Olympics in 2014.",
    similarPlaces: ["Anapa", "Gelendzhik", "Krasnodar"], // Added similar places
  },
];

export default rus;
