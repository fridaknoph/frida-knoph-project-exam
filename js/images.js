const API_URL = "https://images-api.nasa.gov/search?q=mars%2011&description=mars&media_type=image";

const itemContainer = document.querySelector(".container_img");


async function fetchCharacter() {

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        console.log(json.collection.items);

        const images = json.collection.items; 

      
        itemContainer.innerHTML = "";

        for(let i = 0; i < images.length; i++) {

            itemContainer.innerHTML += `<container class="img_text">
                                        <img src="${images[i].links[0].href}" alt="${images[i].data[0].title}"/ class="gallery_img">
                                        <div class="title">${images[i].data[0].title}</div>
                                        <div class="descrip">${images[i].data[0].description}</div>
                                        </container>
                                        `

                                        if (i === 5) { break; }
                                        
        }

    }
    catch(error) {
        console.log(error);   
     }
    
}

fetchCharacter();
