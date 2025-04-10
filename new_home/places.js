const ind = [
  {
    id: 11,
    name: "Taj Mahal",
    country: "India",
    category: "Architecture",
    tags: ["monument", "marble", "world heritage"],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
    desc: "The Taj Mahal is a stunning white marble mausoleum built in memory of Mumtaz Mahal, the wife of Mughal Emperor Shah Jahan. It is a UNESCO World Heritage Site and a symbol of love.",
    similarPlaces: ["Qutub Minar", "Hampi"]
  },
  {
    id: 12,
    name: "Jaipur City Palace",
    country: "India",
    category: "History",
    tags: ["palace", "culture", "heritage"],
    image: "https://images.unsplash.com/photo-1705861145876-2efd5e0392a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphaXB1ciUyMGNpdHklMjBwYWxhY2V8ZW58MHx8MHx8fDA%3D",
    desc: "The Jaipur City Palace is a magnificent complex that showcases a blend of Rajput and Mughal architecture. It serves as a museum and is still the residence of the royal family.",
    similarPlaces: ["Mysore Palace", "Hampi"]
  },
  {
    id: 13,
    name: "Qutub Minar",
    country: "India",
    category: "Architecture",
    tags: ["minar", "history", "landmark"],
    image: "https://images.unsplash.com/photo-1582506896374-b179a1abc899?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHF1dHViJTIwbWluYXJ8ZW58MHx8MHx8fDA%3D",
    desc: "Qutub Minar is the tallest brick minaret in the world, standing at 73 meters. It was built in the 12th century and is part of the Qutub complex, a UNESCO World Heritage Site.",
    similarPlaces: ["Taj Mahal", "Hampi"]
  },
  {
    id: 14,
    name: "Varanasi Ghats",
    country: "India",
    category: "Religion",
    tags: ["temples", "spirituality", "Ganges"],
    image: "https://images.unsplash.com/photo-1706186839147-0d708602587b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZhcmFuYXNpJTIwZ2hhdHN8ZW58MHx8MHx8fDA%3D",
    desc: "The Varanasi Ghats are a series of steps leading to the Ganges River, where pilgrims perform rituals and ceremonies. It is one of the holiest cities in Hinduism.",
    similarPlaces: ["Golden Temple", "Rishikesh"]
  },
  {
    id: 15,
    name: "Manali",
    country: "India",
    category: "Nature",
    tags: ["mountains", "snow", "adventure"],
    image: "https://plus.unsplash.com/premium_photo-1661935282164-5ee95f5bf490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Manali is a popular hill station known for its stunning landscapes, adventure sports, and as a gateway to the Solang Valley and Rohtang Pass.",
    similarPlaces: ["Leh Ladakh"]
  },
  {
    id: 16,
    name: "Ranthambore National Park",
    country: "India",
    category: "Wildlife",
    tags: ["tigers", "safari", "nature"],
    image: "https://images.unsplash.com/photo-1565970112373-9d89e93618f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFudGhhbWJvcmUlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
    desc: "Ranthambore National Park is one of the largest national parks in India, famous for its Bengal tiger population and diverse wildlife. It offers exciting safari experiences.",
    similarPlaces: []
  },
  {
     id: 17,
     name:"Hampi",
     country:"India",
     category:"History",
     tags:["ruins","temples","UNESCO"],
     image:"https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8fDA%3D",
     desc:"Hampi is a UNESCO World Heritage Site known for its ancient temples, ruins, and stunning landscapes. It was once the capital of the Vijayanagara Empire.",
     similarPlaces:["Taj Mahal", "Jaipur City Palace"]
   },
   {
     id: 18,
     name:"Golden Temple",
     country:"India",
     category:"Religion",
     tags:["temple","sikh","peace"],
     image:"https://plus.unsplash.com/premium_photo-1697730426305-113c62434f97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z29sZGVuJTIwdGVtcGxlfGVufDB8fDB8fHww",
     desc:"The Golden Temple, or Harmandir Sahib, is the holiest Gurdwara of Sikhism located in Amritsar. It is known for its stunning gold-plated dome and serene atmosphere.",
     similarPlaces:["Varanasi Ghats"]
   },
   {
      id: 19,
      name:"Mysore Palace",
      country:"India",
      category:"History",
      tags:["palace","architecture","royalty"],
      image:"https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww",
      desc:"Mysore Palace is an architectural marvel that showcases Indo-Saracenic style. It serves as the residence of the Wadiyar dynasty and hosts the famous Dussehra festival.",
      similarPlaces:["Jaipur City Palace"]
   },
   {
      id: 20,
      name:"Rishikesh",
      country:"India",
      category:"Adventure",
      tags:["rafting","yoga","Ganges"],
      image:"https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJpc2hpa2VzaCUyQ2luZGlhfGVufDB8fDB8fHww",
      desc:"Rishikesh, known as the 'Yoga Capital of the World', offers spiritual retreats and adventure activities like white-water rafting along the Ganges River.",
      similarPlaces:["Varanasi Ghats"]
   },
   {
      id: 21,
      name:"Jaisalmer Fort",
      country:"India",
      category:"History",
      tags:["fort","sandstone","desert"],
      image:"https://images.unsplash.com/photo-1647502630791-4c50d7e303d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphaXNhbG1lciUyMGZvcnR8ZW58MHx8MHx8fDA%3D",
      desc:"Jaisalmer Fort, also known as Sonar Quila or Golden Fort, is a UNESCO World Heritage Site made of yellow sandstone that appears golden in color during sunset.",
      similarPlaces:[]
   },
   {
      id: 22,
      name:"Leh Ladakh",
      country:"India",
      category:"Adventure",
      tags:["mountains","biking","scenic"],
      image:"https://images.unsplash.com/photo-1593118845043-359e5f628214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVoJTIwbGFkYWtofGVufDB8fDB8fHww",
      desc:"Leh Ladakh is known for its breathtaking landscapes, high-altitude lakes, and adventure activities like trekking and biking through rugged terrains.",
      similarPlaces:["Manali"]
   }
];

export default ind;
