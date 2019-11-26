const fs = require('fs');

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
       
    document.getElementById('Main-Table-Body').appendChild(tr);
    tr.appendChild(td);
    td.appendChild(input);
}
