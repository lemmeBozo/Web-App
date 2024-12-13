/* 
1. Upon program boot up display local storage
(note make sure that each div has the same ID 
this is because we want to be able to search up information about 
the movie
make another local storage var that holds id(s) )
*/

// Displays initial local storage if any
displayLocalStorage(localStorage.getItem("search"));

// Displays the local storage
function displayLocalStorage(data) {
    if (data) {
        const container = document.querySelector(".search-information");   
        let searches = data.split(",");
        searches.forEach((search) => {
            const listItem = document.createElement("div");
            listItem.classList.add("entry-container");
            listItem.innerText = search;
            container.appendChild(listItem);
        });
    }
}


