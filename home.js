//Wie viele Bilder sollen geladen werden?
var imgNumber=25;

//Lade Bilder
var obj;
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(json => obj = json)
  .then(() => {
      for(var i = 0; i < imgNumber; i++)
      {
            console.log(obj[i].url)
            var img = document.createElement("img");
            img.src = obj[i].url;
            img.id = "image";
            img.height="100"
            img.alt = "Image";
            document.getElementById('output').appendChild(img);
      }
  })