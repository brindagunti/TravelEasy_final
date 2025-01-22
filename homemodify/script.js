// import italyPlaces from "./italy.js";
// import russiaPlaces from "./russia.js";
// import indiaPlaces from "./places.js";

// // Combine all places into a single array
// const data = [...italyPlaces, ...russiaPlaces, ...indiaPlaces];

// // Group places by country
// const groupedPlaces = data.reduce((acc, place) => {
//   if (!acc[place.country]) {
//     acc[place.country] = [];
//   }
//   acc[place.country].push(place);
//   return acc;
// }, {});

// // Function to display the grouped places in the HTML
// function displayPlaces(groupedData) {
//   const placesContainer = document.getElementById("placesContainer");

//   for (const country in groupedData) {
//     // Create a header for the country
//     const countryHeader = document.createElement("h3");
//     countryHeader.textContent = country.toUpperCase();
//     placesContainer.appendChild(countryHeader);

//     // Create a container for the country's places
//     const countryContainer = document.createElement("div");
//     countryContainer.classList.add("country-container");

//     groupedData[country].forEach((place) => {
//       // Create a place card
//       const placeCard = document.createElement("div");
//       placeCard.classList.add("place-card");

//       // Place image
//       const img = document.createElement("img");
//       img.src = place.image;
//       img.alt = place.name;

//       // Place name
//       const name = document.createElement("h4");
//       name.textContent = place.name;

//       // Place description
//       const desc = document.createElement("div");
//       desc.classList.add("description");
//       desc.textContent = place.desc;

//       // Append elements to the card
//       placeCard.appendChild(img);
//       placeCard.appendChild(name);
//       placeCard.appendChild(desc);

//       // Append card to the country container
//       countryContainer.appendChild(placeCard);
//     });

//     // Append the country's container to the main container
//     placesContainer.appendChild(countryContainer);
//   }
// }

// // Call the function to display places on page load
// window.onload = () => displayPlaces(groupedPlaces);
import italyPlaces from "./italy.js";
import russiaPlaces from "./russia.js";
import indiaPlaces from "./places.js";
import usplaces from "./us.js";
// Combine all places into a single array
const data = [...italyPlaces, ...russiaPlaces, ...indiaPlaces, ...usplaces];

// Function to group places by country, category, and tags
function groupPlaces(data) {
  const groupedData = {
    byCountry: {},
    byCategory: {},
    byTags: {},
  };

  data.forEach((place) => {
    // Group by country
    if (!groupedData.byCountry[place.country]) {
      groupedData.byCountry[place.country] = [];
    }
    groupedData.byCountry[place.country].push(place);

    // Group by category
    if (place.category) {
      if (!groupedData.byCategory[place.category]) {
        groupedData.byCategory[place.category] = [];
      }
      groupedData.byCategory[place.category].push(place);
    }

    // Group by tags
    if (place.tags && place.tags.length > 0) {
      place.tags.forEach((tag) => {
        if (!groupedData.byTags[tag]) {
          groupedData.byTags[tag] = [];
        }
        groupedData.byTags[tag].push(place);
      });
    }
  });

  return groupedData;
}

// Function to display the grouped places in the HTML
function displayPlaces(groupedData) {
  const placesContainer = document.getElementById("placesContainer");

  // Function to create a container for place cards
  function createCountryContainer(title, places) {
    if (places.length <= 2) {
      return;
    }
    const countryContainer = document.createElement("div");
    countryContainer.classList.add("country-container");

    const countryHeader = document.createElement("h3");
    countryHeader.textContent = title;
    placesContainer.appendChild(countryHeader);

    places.forEach((place) => {
      const placeCard = document.createElement("div");
      placeCard.classList.add("place-card");

      const img = document.createElement("img");
      img.src = place.image;
      img.alt = place.name;

      const name = document.createElement("h4");
      name.textContent = place.name;

      const desc = document.createElement("div");
      desc.classList.add("description");
      desc.textContent = place.desc;

      placeCard.appendChild(img);
      placeCard.appendChild(name);
      placeCard.appendChild(desc);
      countryContainer.appendChild(placeCard);
    });

    placesContainer.appendChild(countryContainer);
  }

  // Display places grouped by country
  for (const country in groupedData.byCountry) {
    createCountryContainer(country, groupedData.byCountry[country]);
  }

  // Display places grouped by category
  for (const category in groupedData.byCategory) {
    createCountryContainer(category, groupedData.byCategory[category]);
  }

  // Display places grouped by tags
  for (const tag in groupedData.byTags) {
    createCountryContainer(tag, groupedData.byTags[tag]);
  }
}

// Combine all places into a single array
const groupedPlaces = groupPlaces(data);

// Call the function to display places on page load
window.onload = () => displayPlaces(groupedPlaces);
