const fs = require('fs');
const converter = require('./converter');
const path = require("path");

function saveFile(data) {
    fs.writeFile("people.xml", data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File has been written successfully!\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("people.xml", "utf8"));
        }
    });
}

function parseTxtFile(textFile) {
    let filename = path.join(process.cwd(),textFile);
    fs.readFile(filename, 'utf8', (err, data) => {
        let fileData = data.split('\r\n');
        let sortedData = converter.arraySorter(fileData);
        let xmlData = converter.xmlConverter(sortedData);

        saveFile(xmlData);
    });
}

parseTxtFile('test-text.txt');
