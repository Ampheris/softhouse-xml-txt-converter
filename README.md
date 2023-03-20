# Softhouse txt to xml converter
This assignment is written in Node.js with JavasScript

## How to run
Run the code below to start the program:

`node main.js`

For running the test script:

`npm run test`

## Code
The main the js file contains two functions, saveFile(data) and parseTxtFile(textFile). The converter.js file
contains the helper functions.

The parseTxtFile will take an text file as an input parameter and then reads the file content and splits it into an
array. After the data is split it will run through the function arraySorter which returns the people and all its data 
in a key value array.

`let people = [{firstname: 'Jane', lastname: 'Doe', family: [{name: 'Member'...},{...}]}, {...} ]`

The array contains a person per object with all its data and all family members and their information.

After the function returns the sorted array, the parseTxtFile function will then run the sorted
array through the function xmlSorter which in turn take the array and turn it into xml. To do this, the npm package `xml-writer` is 
used. This is because the DOM object cannot be accessed in the server side and also to simplify the task.

After the sorted array is converted into xml, parseTxtFile will then save the data with the saveFile function and print
the result.

## Test
A simple test is created to make sure that the test-text.tx file is converted into the expected xml data.