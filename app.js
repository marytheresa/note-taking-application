#!/usr/bin/env node

//console application to create notes

var readline       = require('readline'),
    fs             = require('fs'),
    program        = require('commander'),
    findInFiles    = require('find-in-files'),
    files          = [],
    filename       = "",
    path           = "",
    note           = "",
    dir            = "./notes";

program
  .version('0.0.1')
  .option('-c, --createnote <note_content>', 'Create a note')
  .option('-v, --viewnote <note_id>', 'View a single note')
  .option('-d, --deletenote <note_id>', 'Delete a single note')
  .option('-l, --listnotes', 'View a formatted list of all the notes taken')
  .option('-s, --searchnotes <query_string>', 'View a formatted list of all the notes that can be identified by the query string')
  .option('-e, --limit <limit>', 'Set the number of items to display in the resulting list')
  .option('-n, --next', 'See the next set of data in the current running query')
  .parse(process.argv);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//conditional statements to set actions for the different commands

if (program.createnote) {
    var note_content   = program.createnote;
    createnotes();
};

if (program.viewnote) {
    var note_id = program.viewnote;
    readNote();
};

if (program.deletenote) {
    var note_id = program.deletenote;
    deleteNote();
};

if (program.listnotes) {
    list();
};

if (program.searchnotes) {
    var query_string = program.searchnotes;
    lookUp(query_string);
};

//function to create the notes

function createnotes() {
    function createFolder(dir) {
        if (!fs.existsSync(dir)) {
            console.log('Your folder is going to be created')
            fs.mkdirSync(dir);
        }
    }

    createFolder(dir);
    
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
            saveNote(fd, note_content);
        })
    }

    function saveNote(fd, note_content) {
        fs.writeFile(fd, note_content, (err) => {
            if (err) throw err;
            console.log('Your note is saved!');
        }); 
    }
}
 
function readNote() {
    path = dir + '/' + note_id;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}

function deleteNote() {
    path = dir + '/' + note_id;
    fs.unlink(path, (err) => {
        if (err) throw err;
        console.log("Your note has been successfully deleted")
    }); 
}

function list() {
    fs.readdir('notes', (err, files) => {
        if (err) throw err;
        //conditional to check if a limit was provided in the command
        else if (program.limit) {
            var start = 0;
            console.log(start);
            var limit = program.limit;
            var stop = start + (limit - 1);
            console.log(stop);
            for (i = start; i <= stop; i++) {
                console.log(i + 1 + ". " + files[i])
            }
            var start = stop + 1;
            var stop = start + (limit - 1);
            //this is supposed to set functionality for the `next` command, I am not sure it works
            if (program.next) {
                for (i = start; i <= stop; i++) {
                    console.log(i + 1 + ". " + files[i])
                }
            }
        }
        else {
            console.log('-------------------------------------');
            var start = 0;
            console.log(start);
            var limit = files.length
            var stop = start + (limit - 1);
            console.log(stop);
            for (i = start; i <= stop; i++) {
                console.log(i + 1 + ". " + files[i])
            }
        }
    });
}

function lookUp(query_string) {
    findInFiles.find(query_string, './notes')
    .then(function(results) {
        var start = 0;
        var i = start;
        if (program.limit) {
            console.log(start);
            var stop = start + (program.limit - 1);
            console.log(stop);                
            console.log('----------------"' + query_string + '" is found in the following files----------------')
            for (entry in results) {
                if (i <= stop) {
                    console.log(i + 1 + ". " + entry);
                    i += 1;
                }
            }
            var start = stop + 1;
            var stop = start + (limit - 1);
            //this is supposed to set functionality for the `next` command, I am not sure it works
            if (program.next) {
                for (i = start; i <= stop; i++) {
                    console.log(i + 1 + ". " + files[i])
                }
            }
        }
        else {
            console.log('----------------"' + query_string + '" is found in the following files----------------')
            for (entry in results) {
                console.log(i + 1 + ". " + entry);
                i += 1;
            }
        }
    });
}