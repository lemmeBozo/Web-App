/* 
1. Upon program boot up display local storage
(note make sure that each div has the same ID 
this is because we want to be able to search up information about 
the movie
make another local storage var that holds id(s) )
*/

// HTML elements
const form = document.getElementById("search-form");
let clearButton = document.querySelector(".clear");

// Displays initial local storage if any
displayLocalStorage(localStorage.getItem("search"));

// Displays the local storage
function displayLocalStorage(data) {
    if (data) {
        const container = document.querySelector(".search-information");   
        let searches = data.split(",");
        searches.forEach((search) => {
            const div = document.createElement("div");
            div.classList.add("entry-container");
            const span = document.createElement("span");
            span.innerText = search;
            div.appendChild(span);
            container.appendChild(div);
        });
    }
}

// Adds strings to local storage (to be displayed)
function addToLocalStorage(search) {
    const container = document.querySelector(".search-information");
    let data = localStorage.getItem("search");
    if (data) {
        data += "," + (search);
    } else {
        data = search;
    }
        const div = document.createElement("div");
        div.innerText = search;
        div.classList.add("entry-container");
        container.appendChild(div);
    localStorage.setItem("search", data);
}

// Adds form functionality
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents page refresh
    const searchValue = document.querySelector(".search-input").value;
    document.querySelector(".search-input").value = ""; // Clears value after submiting form
    //const searchURL = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${encodeURI(searchValue)}`;
    addToLocalStorage(searchValue);
    // try {
    //     let info = parseJson(await fetchData(searchURL));
    //     if (!Object.keys(info).length == 0) {
    //         listMovies(info);
    //     } else {
    //         alert("No movies found under that name");
    //     }
    //     addListListeners();    
    // } catch(error) {
    //     console.error("Error fetching data: ", error);
    // }
});


// Clears local storage
clearButton.addEventListener("click", ()=> {
    const container = document.querySelector(".search-information");
    clearElement(container);
    localStorage.removeItem("search");
});

// Helper function
function clearElement(element) {element.innerHTML = '';}



/*
When displaying entries gotten from api
make sure to use ".entry-container" class so that the styling just applies to it too


*/