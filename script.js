// API Key
const API_KEY = "TSYG1xjK9P1Pzej0W7UhbtV9qbvtaC7d693lME1Y";

// HTML Elements
const form = document.getElementById("search-form");

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
    const container = document.getElementById("container");
    Array.from(container.querySelectorAll(".movie")).forEach((movie) => {
        movie.addEventListener("click", (e) => {
            console.log(e.target);
        });
    });
}

function clearElement(element) {element.innerHTML = '';}

function listMovies(movies) {
    // Selects container in which items will be appended to
    const container = document.querySelector(".entertainment-information");
    clearElement(container); // Clears all child elements inside container
    const list = document.createElement("ul");
    Object.values(movies).forEach((movie) => {
        const li = document.createElement("li");
        li.dataset.label = movie.id;
        li.classList.add("movie");
        li.innerHTML = movie.name;
        list.appendChild(li);
    })
    container.appendChild(list);
}

// Event Listeners
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents page refresh
    const form = event.target;
    const searchValue = document.querySelector(".search-input").value;
    const searchURL = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${encodeURI(searchValue)}`;
    try {
        let info = parseJson(await fetchData(searchURL));
        listMovies(info);
        addListListeners();
    } catch(error) {
        console.error("Error fetching data: ", error);
    }
});