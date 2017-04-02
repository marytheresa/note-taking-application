#!/usr/bin/env node

//console application to create notes

var readline       = require('readline'),
    fs             = require('fs'),
    program        = require('commander'),
    findInFiles    = require('find-in-files'),
    filename       = "",
    path           = "",
    note           = "",
    dir            = "./notes";

program
  .version('0.0.1')
  .option('-c, --createnote <note_content>', 'Create a note')
  .option('-v, --viewnote', 'View a single note')
  .option('-d, --deletenote', 'Delete a single note')
  .option('-l, --listnotes', 'View a formatted list of all the notes taken')
  .option('-s, --searchnotes', 'View a formatted list of all the notes that can be identified by the query string')
  .parse(process.argv);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (program.createnote) {
    createnotes();
};

if (program.viewnote) {
    readNote(path);
};

if (program.deletenote) {
    deleteNote(path);
};

if (program.listnotes) {
    listNotes();
};

if (program.searchnotes) {
    searchNotes(queryString);
};

function createnotes() {
    function createFolder(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    rl.question('Enter a name for your note here ==>  ', (filename) => {
        createFile(filename);
    })

    //function to check if file exists and create the file

    function createFile(filename) {
        path = dir + '/' + filename;
        fs.open(path, 'wx', (err, fd) => {
            if (err) {
                if (err.code === "EEXIST") {
                    console.error('file already exists');
                    return;
                }
                else {
                    throw err;
                }
            }
            writeNote(fd);
        })
    }

    //function to write the notes

    function writeNote(fd) {
        rl.question('Enter your note here ==>  ', (note_content) => {
            saveNote(fd, note_content);
        });
    }
    
    function saveNote(fd, note_content) {
        fs.writeFile(fd, note_content, (err) => {
            if (err) throw err;
            console.log('Your note is saved!');
        }) 
    }
}
 
function readNote(path) {
    rl.question('Enter the filename you want to read here ==>  ', (filename) => {
        path = dir + '/' + filename;
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
        });    
    });
}

function deleteNote(path) {
    rl.question('Enter the filename you want to delete here ==>  ', (filename) => {
        path = dir + '/' + filename;
        fs.unlink(path, (err) => {
            if (err) throw err;
            console.log("Your note has been successfully deleted")
        }); 
        rl.close(); 
    });
}

function listNotes() {
    fs.readdir('notes', (err, files) => {
        if (err) throw err;
        for (i = 0; i < files.length; i++) {
            console.log(i + 1 + ". " + files[i])
        }
    });   
}

function searchNotes(queryString) {
    findInFiles.find(queryString, './notes')
    .then(function(results) {
        var i = 1;
        console.log('----------------"' + queryString + '" is found in the following files----------------')
        for (result in results) {
            console.log(i + ". " + result);
            i += 1;
        }
    });
}