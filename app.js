

//console application to create notes

var readline       = require('readline'),
    fs             = require('fs'),
    filename       = "",
    note           = "",
    directory      = "";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a name for your note here ==>  ', (name) => {
    filename += name;
    console.log(filename);
    createFile(filename);
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
    rl.question('Enter your note here ==>  ', (data) => {
        console.log(data)
        note += data;
        saveNote(fd, note);
    });
}
    
function saveNote(fd, note) {
   fs.writeFile(fd, note, (err) => {
        if (err) throw err;
        console.log('Your note is saved!')
        readNote(filename);
    }) 
}
 
function readNote(filename) {
    rl.question('Enter the filename you want to read here ==>  ', (filename) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data)
            deleteNote(filename);
        });    
    });
}

function deleteNote(filename) {
    rl.question('Enter the filename you want to delete here ==>  ', (filename) => {
        fs.unlink(filename, (err) => {
            if (err) throw err;
            console.log("Your note has been successfully deleted")
            listNotes(directory)
        });    
    });
}

function listNotes(directory) {
    rl.question('Enter the directory from which you want to list the notes ==>  ', (directory) => {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (i = 0; i < files.length; i++) {
                console.log(i + 1 + ". " + files[i])
            }
            rl.close();
        });    
    });
}