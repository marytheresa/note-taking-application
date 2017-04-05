NOTE-TAKING-APPLICATION

Application to take down and save notes and retrieve them when required.

REPOSITORY STRUCTURE

It contains the `app.js` file containing all the code.

HOW TO USE:

Clone this repository either by downloading a zipped copy and unzipping to folder of your choice on your local machine or by running `git clone https://github.com/marytheresa/note-taking-application` on the command line after navigating to parent folder of your choice.

Navigate to the repository folder, `note-taking-application`, on the command line.

Run `npm install -g` to install the dependencies.

TESTING:

To test the functionality of the command line application - app.js, use the command `note`.

COMMANDS:

To create a note, run `note -c <note_content>` or `note createnote <note_content>`.

To view a single note, run `note -v <note_id>` or `note viewnote <note_id>`.

To delete a single note, run `note -d <note_id>` or `note deletenote <note_id>`.

To view a formatted list of all the notes taken, run `note -l` or `note listnotes`.

To set the number of notes to display in the resulting list, run `note -le <limit>` or `note listnotes -e <limit>`.

To view a formatted list of all the notes identified by a query string, run `note -s <query_string>` or `note searchnotes <query_string>`.

To set the number of notes to display, run `note -s <query_string> -e <limit>` or `note searchnotes <query_string> -e <limit>`.

To see the next set of data in the current running query, run `note -n` or `note next`.