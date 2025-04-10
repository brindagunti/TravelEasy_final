import italyPlaces from "./italy.js";
import russiaPlaces from "./russia.js";
import indiaPlaces from "./places.js";
import usplaces from "./us.js";
const similarPlacesData = [
  ...italyPlaces,
  ...indiaPlaces,
  ...usplaces,
  ...russiaPlaces,
];

function findplace(placeid) {
  let index = 0;
  console.log("Searching");
  while (index < similarPlacesData.length) {
    const p = similarPlacesData[index];
    console.log(p.id, parseInt(placeid));
    if (p.id === parseInt(placeid)) {
      console.log(p);
      renderPlaceDetails(similarPlacesData[index]);
      // console.log(p);
      break;
    }
    index++;
  }
}

function renderPlaceDetails(place) {
  const container = document.getElementById("place-container");

  container.innerHTML = `
          <div class="background-image" style="background-image: url('${place.image}');">
              <div class="overlay">
                  <header class="header">
                      <h1>${place.name}</h1>
                      <p>Country: ${place.country}</p>
                  </header>
              </div>
          </div>
          <section class="description">
              <h2>Description</h2>
              <p>${place.desc}</p>
          </section>

          <section class="suggestions">
              <h2>Similar Places in ${place.country}</h2>
              <div id="placesContainer" class="country-container"></div>
          </section>

          <section class="details">
              <h2>Category</h2>
              <div id="catdiv" class="country-container"></div>
          </section>

          <footer class="footer">
              <p>&copy; 2025 Travel Easys Information Page.</p>
          </footer>
      `;

  // Call displayPlaces for each similar place
  place.similarPlaces.forEach((similarPlaceName) => {
    const similarPlaceData = similarPlacesData.filter(
      (p) => p.name === similarPlaceName
    );
    // console.log(similarPlaceData);
    similarPlaceData.forEach((similarPlace) => {
      displayPlaces(similarPlace, "placesContainer");
    });
  });

  if (place.category) {
    // Use filter to get all matching elements with the same category
    const matchingCategories = similarPlacesData.filter(
      (p) => p.category === place.category && p != place
    );
    console.log(matchingCategories);
    // Display all matching places
    matchingCategories.forEach((categoryData) => {
      displayPlaces(categoryData, "catdiv");
    });
  }
}

// Function to display a single place as a card
// function displayPlaces(similarPlace) {
//   const placesContainer = document.getElementById("placesContainer");

//   // Create a card for the similar place
//   const placeCard = document.createElement("div");
//   const link = document.createElement("a");

//   link.href = "specific.html?placeid=" + similarPlace.id;
//   link.target = "_blank";
//   placeCard.classList.add("place-card");
// placeCard.appendChild
// const img = document.createElement("img");
// img.src = similarPlace.image;
// img.alt = similarPlace.name;

// const name = document.createElement("h4");
// name.textContent = similarPlace.name;

// const desc = document.createElement("div");
// desc.classList.add("description");
// desc.textContent = similarPlace.desc;

// placeCard.appendChild(img);
// placeCard.appendChild(name);
// placeCard.appendChild(desc);
// link.appendChild(placeCard);
// placesContainer.appendChild(link);
// }
function displayPlaces(similarPlace, divname) {
  const placesContainer = document.getElementById("" + divname);
  if (!placesContainer) {
    console.error(`Container with id "${divname}" not found!`);
    return;
  }
  // Create a link for navigation
  const link = document.createElement("a");
  link.href = "/new_home/specific.html?placeid=" + similarPlace.id;
  link.target = "_self"; // Open in the same tab (adjust as needed)

  // Create a card for the similar place
  const placeCard = document.createElement("div");
  placeCard.classList.add("place-card");

  const img = document.createElement("img");
  img.src = similarPlace.image;
  img.alt = similarPlace.name;

  const name = document.createElement("h4");
  name.textContent = similarPlace.name;

  const desc = document.createElement("div");
  desc.classList.add("description");
  desc.textContent = similarPlace.desc;

  // Append card content
  placeCard.appendChild(img);
  placeCard.appendChild(name);
  placeCard.appendChild(desc);

  // Append the card to the link
  link.appendChild(placeCard);

  // Append the link to the container
  placesContainer.appendChild(link);
}

// Call the function to render details when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // renderPlaceDetails(place);
  console.log("loading");
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const placeid = urlParams.get("placeid");
  console.log(placeid);
  findplace(placeid);
});
