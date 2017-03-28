

//console application to create notes

var readline       = require('readline'),
    fs             = require('fs'),
    filename       = "",
    note           = "";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a name for your note here ==>  ', (name) => {
    filename += name;
    console.log(filename);
    createFile(filename);
    rl.close();
})

//function to check if file exists and create the file

function createFile(filename) {
    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === "EEXIST") {
                console.error('file already exists');
                return;
            }
            else {
                throw err;
            }
        }
        console.log(fd)
        writeNote(fd);
    })
}

//function to write the notes

function writeNote(fd) {
    console.log(note);
    rl.question('Enter your note here ==>  ', (data) => {
        console.log(data)                                //stops executing here, not sure why
        note += data;
        saveNote(fd, note);
        rl.close();
    })
}
    
function saveNote(fd, note) {
   fs.writeFile(fd, note, (err) => {
        if (err) throw err;
        console.log('Your note is saved!')
    }) 
}
    