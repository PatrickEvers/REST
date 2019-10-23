//Lege base URL fest
var baseURL = 'https://jsonplaceholder.typicode.com';
var photos = 'photos/'

//Wie viele Bilder sollen geladen werden?
var imgNumber=25;

//Lade Bilder
let urls = [];
for(var i = 1; i<=imgNumber; i++){
    //Hole URL für aktuelles Bild
    var anhang=photos+i;
    var test = new URL(anhang, 'https://jsonplaceholder.typicode.com')

    //Lade das Bild
    let url = fetch(test)
    .then(response => response.json())
    .then(json => json.url)
    urls[i-1] = url;
}

//Zeige Bilder an
for(var i = 0; i < imgNumber; i++){
    urls[i].then(function(result){
        var img = document.createElement("img");
        img.src = result;
        img.id = "image";
        img.height="100"
        img.alt = "Image";
        document.getElementById('output').appendChild(img);
    })
}