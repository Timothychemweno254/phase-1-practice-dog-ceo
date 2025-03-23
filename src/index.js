document.addEventListener("DOMContentLoaded", () => {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breedsList = document.getElementById("breeds-list");
        const breeds = Object.keys(data.message);  // Get the breed names
        const filterDropdown = document.getElementById("breed-filter");
  
        // Function to render breeds
        const renderBreeds = (breedsToRender) => {
          breedsList.innerHTML = ""; // Clear existing list
          breedsToRender.forEach(breed => {
            const liElement = document.createElement("li");
            liElement.textContent = breed;
            liElement.addEventListener("click", () => {
              liElement.style.color = "red";  // Change color to red on click
            });
            breedsList.appendChild(liElement);
          });
        };
  
        // Initially render all breeds
        renderBreeds(breeds);
  
        // Filter breeds based on selected letter
        filterDropdown.addEventListener("change", (event) => {
          const selectedLetter = event.target.value;
          if (selectedLetter) {
            const filteredBreeds = breeds.filter(breed => breed[0].toLowerCase() === selectedLetter);
            renderBreeds(filteredBreeds);
          } else {
            renderBreeds(breeds);  // Render all breeds if no letter is selected
          }
        });
      })
      .catch(error => console.log("Error fetching dog breeds:", error));
  });
  