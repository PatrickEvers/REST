//Wie viele Bilder sollen geladen werden?
var imgNumber=25;

//Lade Bilder
async function getPhotos(){
    let response = await fetch('https://jsonplaceholder.typicode.com/photos');
    let data = await response.json();

    for(var i = 0; i < imgNumber; i++)
    {
        var img = document.createElement("img");
        img.src = data[i].url;
        img.id = "image";
        img.height="100"
        img.alt = "Image";
        document.getElementById('output').appendChild(img);
    }
}
getPhotos();