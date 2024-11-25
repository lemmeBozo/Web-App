// API Key
const API_KEY = "TSYG1xjK9P1Pzej0W7UhbtV9qbvtaC7d693lME1Y";
let data;
/* 
    For the record I know im not supposed to have my api key be public
    I was going to have a backend with nodeJS but that is wayyyyy too complicated for me
    I tried, so my api key will just be public
*/

function listMovies() {
    // Selects container in which items will be appended to
    const container = document.querySelector(".entertainment-information");

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


const form = document.getElementById("search-form");

// Saves user inputed value into variable
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents page refresh
    const form = event.target;
    const searchValue = document.querySelector(".search-input").value;
    const searchURL = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${encodeURI(searchValue)}`;
    console.log(searchURL);
    try {
        let info = parseJson(await fetchData(searchURL));
        console.log(info);
    } catch(error) {
        console.error("Error fetching data: ", error);
    }
});

