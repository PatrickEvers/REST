const fs = require('fs');
const crypto = require('crypto');
const fsasync = fs.promises;

//Hole die Namen der Bilder aus der Datei.
var photoNames = fs.readFileSync('photoNames.txt','utf8').toString();
photoNames = photoNames.substring(0,photoNames.lastIndexOf('\nVerschlüsselte Namen:\n')-1).split('\n');

//Erstelle neue Tabellenzeilen mit Inputfeldern in denen die Bildernamen stehen.
for(var i = 0; i < photoNames.length; i++)
{
    var tr = document.createElement('tr');
    var td = document.createElement('td');   
    var input = document.createElement("input");
    input.type = "text";
    input.value = photoNames[i];
    var inputId = "Photo-Name"+(i+1);
    input.id = inputId;

    document.getElementById('Main-Table-Body').appendChild(tr);
    tr.appendChild(td);
    td.appendChild(input);
}

//Klickevent für den Button. Verschlüsselt die Bildernamen & schreibt sie in eine neue Datei.
document.getElementById('Btn').addEventListener('click', () => {
    var content = "";
    for(var i = 0; i < photoNames.length; i++)
    {
        inputId = "Photo-Name"+(i+1);
        input = document.getElementById(inputId);
        
        content += enc(input.value) + "\n";
        fsasync.writeFile('photoNamesEnc.txt', content, 'utf8');       
    }
})

//Funktion für die Verschlüsselung
function enc (text){
    var key = crypto.createCipher('aes-128-cbc', "Pa$$W0rd");
    var str = key.update(text, 'utf8', 'hex')
    str += key.final('hex');
    
    return(str);
}