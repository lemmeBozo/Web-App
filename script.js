displayLocalStorage(localStorage.getItem("search"))

// API Key
const API_KEY = "TSYG1xjK9P1Pzej0W7UhbtV9qbvtaC7d693lME1Y";

// HTML Elements
const form = document.getElementById("search-form");
const container = document.querySelector(".entertainment-information");

// Helper Functions

// Fetches data at url and returns data as JSON
async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) { // if response is not ok, throw error
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parses and returns the response as a JSON (i.e. object)
        const data = await response.json();
        return data; // Returns the data
    } catch (error) { // if error is thrown, handles it
        console.error("Error occurred: ", error);
    }
}

function parseJson(data) {
    let info = {};
    data.title_results.forEach((item, i) => {
        info[`Movie ${i}`] = {
            "name": item.name,
            "id": item.id
        }
    })
    return info;
}

function addListListeners() {
    Array.from(container.querySelectorAll(".movie")).forEach((movie) => {
        movie.addEventListener("click", async (e) => {
            const title_id = e.target.dataset.label;
            const detailsURL = `https://api.watchmode.com/v1/title/${title_id}/details/?apiKey=${API_KEY}&append_to_response=sources`;
            try {
                let data = await fetchData(detailsURL);
                const validSources = data.sources.filter(source => source.region == "US")
                displaySources(validSources, e);
                console.log(validSources);
            } catch (error) {console.error(error);}

        });
    });
}

function clearElement(element) {element.innerHTML = '';}

function listMovies(movies) {
    // Clear the container before appending new items
    clearElement(container);

    // Iterate through each movie and create a div for it
    Object.values(movies).forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.dataset.label = movie.id; // Store movie ID for later use
        movieDiv.classList.add("movie"); // Add class for styling
        movieDiv.innerHTML = `<span>${movie.name}</span>`; // Add movie name inside a span for better structure

        // Append the movie div to the container
        container.appendChild(movieDiv);
    });
}


// Event Listeners
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents page refresh
    const searchValue = document.querySelector(".search-input").value;
    const searchURL = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${encodeURI(searchValue)}`;
    addToLocalStorage(searchValue);
    try {
        let info = parseJson(await fetchData(searchURL));
        if (!Object.keys(info).length == 0) {
            listMovies(info);
        } else {
            alert("No movies found under that name");
        }
        addListListeners();    
    } catch(error) {
        console.error("Error fetching data: ", error);
    }
});

function addToLocalStorage(search) {
    const container = document.querySelector(".searches");
    let data = localStorage.getItem("search");
    if (data) {
        data += "," + (search);
    } else {
        data = search;
    }
        const listItem = document.createElement("li");
        listItem.innerText = search;
        container.appendChild(listItem);
    localStorage.setItem("search", data);
}

function displayLocalStorage(data) {
    if (data) {
        const container = document.querySelector(".searches");   
        let searches = data.split(",");
        searches.forEach((search) => {
            const listItem = document.createElement("li");
            listItem.innerText = search;
            container.appendChild(listItem);
        });
    }
}

document.querySelector(".clear").addEventListener("click", ()=>{
    const container = document.querySelector(".searches");
    clearElement(container);
    localStorage.removeItem("search");  
});

function displaySources(sources, e) {
    let container = document.createElement("div"); // Create a container div
    container.display = "flex";
    container.style.border = "1px solid black"; // Optional: Add styling
    container.style.padding = "10px";

    sources.forEach((source) => {
        let sourceDiv = document.createElement("div"); // Create a div for each source
        sourceDiv.innerText = source.name; // Set the source name
        sourceDiv.style.marginBottom = "5px"; // Optional: Add spacing
        container.appendChild(sourceDiv); // Append to the container
    });

    // Append the container to the target
    e.target.appendChild(container);
}




/* 
create svg folder that has the common sources
then upon source being found for the desired movie
display the svgs that in in themselves are links 


*/