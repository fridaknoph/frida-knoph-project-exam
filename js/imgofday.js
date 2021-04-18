const API_URL = "https://api.nasa.gov/planetary/apod?api_key=zJDIhzpxVP309Fq8OS4Kns9NFwfAFwqD6HZmRCIn";

const itemContainer = document.querySelector(".img_of_the_day");


async function fetchImage() {

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        console.log(json);

        const images = json; 

      
        itemContainer.innerHTML = "";

        
        imgOfDay(json);
                              
                                        
        

    }
    catch(error) {
        console.log(error);   
     }
    
}




fetchImage();

function imgOfDay(json) {
                                itemContainer.innerHTML = `<container class="img_text">
                                <img src="${json.url}" alt="${json.title}"/ class="img_day">
                                <div class="title">${json.title}</div>
                                <div class="date">${json.date}</div>
                                <div class="descrip">${json.explanation}</div>
                                </container>`;
                            }