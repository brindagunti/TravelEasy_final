const ind = [
  {
    id: 11,
    name: "Taj Mahal",
    country: "India",
    category: "Architecture",
    tags: ["monument", "marble", "world heritage"],
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGFqJTIwTWFoYWx8ZW58MHx8MHx8fDA%3D",
    desc: "The Taj Mahal is a stunning white marble mausoleum built in memory of Mumtaz Mahal, the wife of Mughal Emperor Shah Jahan. It is a UNESCO World Heritage Site and a symbol of love.",
    similarPlaces: ["Agra Fort", "Fatehpur Sikri", "Humayun's Tomb"],
  },
  {
    id: 12,
    name: "Jaipur City Palace",
    country: "India",
    category: "History",
    tags: ["palace", "culture", "heritage"],
    image:
      "https://images.unsplash.com/photo-1534758755011-03cdf52658d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SmFpcHVyJTIwQ2l0eSUyMFBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "The Jaipur City Palace is a magnificent complex that showcases a blend of Rajput and Mughal architecture. It serves as a museum and is still the residence of the royal family.",
    similarPlaces: ["Hawa Mahal", "Amber Fort", "Jantar Mantar"],
  },
  {
    id: 13,
    name: "Qutub Minar",
    country: "India",
    category: "Architecture",
    tags: ["minar", "history", "landmark"],
    image:
      "https://images.unsplash.com/photo-1582507095808-c518359b6cd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFF1dHViJTIwTWluYXJ8ZW58MHx8MHx8fDA%3D",
    desc: "Qutub Minar is the tallest brick minaret in the world, standing at 73 meters. It was built in the 12th century and is part of the Qutub complex, a UNESCO World Heritage Site.",
    similarPlaces: ["Humayun's Tomb", "Red Fort", "Lotus Temple"],
  },
  {
    id: 14,
    name: "Varanasi Ghats",
    country: "India",
    category: "Religion",
    tags: ["temples", "spirituality", "Ganges"],
    image:
      "https://media.istockphoto.com/id/1163455002/photo/varanasi-city-architecture-with-view-of-migratory-birds-on-river-ganges-as-seen-from-a-boat.webp?a=1&b=1&s=612x612&w=0&k=20&c=DHMsGDJKtHHnQR8GCnaLtNZKAn_ZLegbMKpeF-A3s9A=",
    desc: "The Varanasi Ghats are a series of steps leading to the Ganges River, where pilgrims perform rituals and ceremonies. It is one of the holiest cities in Hinduism.",
    similarPlaces: ["Kashi Vishwanath Temple", "Sarnath", "Rishikesh"],
  },
  {
    id: 15,
    name: "Manali",
    country: "India",
    category: "Nature",
    tags: ["mountains", "snow", "adventure"],
    image:
      "https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Manali is a popular hill station known for its stunning landscapes, adventure sports, and as a gateway to the Solang Valley and Rohtang Pass.",
    similarPlaces: ["Shimla", "Dharamshala", "Kullu"],
  },
  {
    id: 16,
    name: "Ranthambore National Park",
    country: "India",
    category: "Wildlife",
    tags: ["tigers", "safari", "nature"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq7fE8zi2tQLgmpgCXGx7Np8-kvSVMsClVg&s",
    desc: "Ranthambore National Park is one of the largest national parks in India, famous for its Bengal tiger population and diverse wildlife. It offers exciting safari experiences.",
    similarPlaces: [
      "Jim Corbett National Park",
      "Bandhavgarh National Park",
      "Kaziranga National Park",
    ], // Added similar places
  },
  {
    id: 17,
    name: "Hampi",
    country: "India",
    category: "History",
    tags: ["ruins", "temples", "UNESCO"],
    image:
      "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFtcGl8ZW58MHx8MHx8fDA%3D",
    desc: "Hampi is a UNESCO World Heritage Site known for its ancient temples, ruins, and stunning landscapes. It was once the capital of the Vijayanagara Empire.",
    similarPlaces: ["Badami", "Pattadakal", "Aihole"], // Added similar places
  },
  {
    id: 18,
    name: "Golden Temple",
    country: "India",
    category: "Religion",
    tags: ["temple", "sikh", "peace"],
    image:
      "https://media.istockphoto.com/id/2160652980/photo/golden-temple-amritsar.webp?a=1&b=1&s=612x612&w=0&k=20&c=Dnh7cujRf9abwDU9eL6s7x0Bq3JRBVIYgiOSdc6zNUo=",
    desc: "The Golden Temple, or Harmandir Sahib, is the holiest Gurdwara of Sikhism located in Amritsar. It is known for its stunning gold-plated dome and serene atmosphere.",
    similarPlaces: ["Jallianwala Bagh", "Wagah Border", "Durgiana Temple"], // Added similar places
  },
  {
    id: 19,
    name: "Mysore Palace",
    country: "India",
    category: "History",
    tags: ["palace", "architecture", "royalty"],
    image:
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww",
    desc: "Mysore Palace is an architectural marvel that showcases Indo-Saracenic style. It serves as the residence of the Wadiyar dynasty and hosts the famous Dussehra festival.",
    similarPlaces: [
      "Brindavan Gardens",
      "Chamundi Hill",
      "St. Philomena's Church",
    ], // Added similar places
  },
  {
    id: 20,
    name: "Rishikesh",
    country: "India",
    category: "Adventure",
    tags: ["rafting", "yoga", "Ganges"],
    image:
      "https://images.unsplash.com/photo-1607406374368-809f8ec7f118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmlzaGlrZXNofGVufDB8fDB8fHww",
    desc: "Rishikesh, known as the 'Yoga Capital of the World', offers spiritual retreats and adventure activities like white-water rafting along the Ganges River.",
    similarPlaces: ["Haridwar", "Dehradun", "Lansdowne"], // Added similar places
  },
];

export default ind;
