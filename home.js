const fs = require('fs');
const crypto = require('crypto');
const fsasync = fs.promises;
const remote = require('electron').remote;
const main = remote.require('./main.js');

//Wie viele Bilder sollen geladen werden?
var imgNumber=25;

//Lade Bilder
async function getPhotos(){
    let response = await fetch('https://jsonplaceholder.typicode.com/photos');
    let data = await response.json();
    var photoName;
    var content = "";   
    
    for(var i = 0; i < imgNumber; i++)
    {
        var img = document.createElement("img");
        img.src = data[i].url;
        img.id = "image";
        img.height="100";
        img.alt = "Image";
        document.getElementById('output').appendChild(img);
        photoName = data[i].url.substring(data[i].url.lastIndexOf('/')+1);
        content += photoName + "\n";
    }
  
    await fsasync.writeFile('photoNames.txt', content, 'utf8');    
}
(async () => { await
   getPhotos();
    })();  

//Klickevent für den Button
document.getElementById('encBtn').addEventListener('click', () => {

    //Hole Passwort aus dem Textfeld
    var password = document.getElementById('password').value;

    //Lese die Datei, um die Namen der Bilder zu bekommen und splitte den String auf
    var text = fs.readFileSync('photoNames.txt','utf8').toString().split('\n');
    
    //Verschlüssel die Namen der Bilder und schreibe sie in die Textdatei
    var content = "\nVerschlüsselte Namen:\n";
    for(var i = 0; i < text.length; i++)
    {
        if(text[i] != "")
        {
            content += enc(password, text[i])+"\n";
        }
    }
    fsasync.appendFile('photoNames.txt',content,'utf8');
    main.newBrowserWindow();
})

//Funktion für die Verschlüsselung
function enc (password, text){
    var key = crypto.createCipher('aes-128-cbc', password);
    var str = key.update(text, 'utf8', 'hex')
    str += key.final('hex');
    
    return(str);
}
