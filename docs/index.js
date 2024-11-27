const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');
const inputfield = document.getElementById('search-input');
let character = inputfield.placeholder;
const url = `https://api.unsplash.com/search/photos?page=1&client_id=2TMZt136qJJby3z1aUwzpcwPOd-WA_ENITeJ_br5oxE&query=${character}`;
let display = document.getElementById("display")

button.addEventListener('click',()=>{
    menu.classList.toggle('hidden')
})


async function getData(charactertyped){
    let newurl = `https://api.unsplash.com/search/photos?page=1&client_id=2TMZt136qJJby3z1aUwzpcwPOd-WA_ENITeJ_br5oxE&query=${charactertyped}`;
    const response = await fetch(newurl);
    const data = await response.json();
    console.log(data)
    return data
}

inputfield.addEventListener('input',(e) =>{
    let charactertyped = e.target.value;
    getData(charactertyped);
    displayImages(charactertyped)
})

async function displayImages(charactertyped){
    let imagetodisplay = await getData(charactertyped);
    let datadisplay = imagetodisplay.results.map((object) => {
       
        const {urls} = object;
        return `
        <div class = "container">
        <img class = "h-auto max-w-full rounded-lg" src = ${object.urls.regular} alt = ${object.alt_description}>
        <p class ="bg-white rounded-lg mt-2">${object.alt_description}</p>
        </div>
        `
    }).join("");

    display.innerHTML = datadisplay;
    /* console.log(display) */
    
}

displayImages()


/* async function getPhotos(character) {
   
    fetch(url)
     .then(function(response){
        return response.json();
        
     })
     .then(function(data){
        console.log(data)
        data.results.map(data => console.log(data.urls.regular))
        console.log(data.results[0])
        const imageElement = document.createElement("img");
        const display = document.getElementById('display');
        imageElement.src = data.results[0].urls.regular
        display.appendChild(imageElement);
     })
     .catch((error) => console.error(error));
        
    
    }

    */
