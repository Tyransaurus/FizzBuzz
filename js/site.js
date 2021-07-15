//Wrapper function/method - a function that calls other functions
function getNumbers() {

    // This is where the variables get values from the webpage 
    let firstInput = document.getElementById("firstValue").value;
    let secondInput = document.getElementById("secondValue").value;
    let inner = document.getElementById("innerBounds").value;
    let outer= document.getElementById("outerBounds").value;

    // This is where they are checked to make sure they are integers
    let first = parseInt(firstInput);
    let second = parseInt(secondInput);
    innerBounds = parseInt(inner);
    outerBounds = parseInt(outer);

    //setting up boolean and an empty string for error codes
    let errorState = false;
    let errorMsg = "";

    //this becomes true if the values are not numbers
    if (isNaN(first) || isNaN(second) || isNaN(innerBounds) || isNaN(outerBounds)) {
        errorState = true;
        errorMsg += "Please use numbers<hr/>"
    }

    //this becomes true if the outer bounds value is less than the inner bounds value
    if (innerBounds > outerBounds) {
        errorState = true;
        errorMsg += "the inner bound must be less than the outer bound<hr/>"
    }

    // this becomes true if you try to put in negative integers or integers over 10,000
    // this sets an limit for the loops
    if (first > 10000 || first < 0 || second > 10000 || second < 0 || innerBounds > 10000 || innerBounds < 0 || outerBounds > 10000 || outerBounds < 0) {
        errorState = true;
        errorMsg += "try to keep it in between 0 and 10,000<hr/>"
    }
    //if any of the previous becomes true, a SweetAlert will fire and exit the function
    if (errorState) {
        Swal.fire(
            'Something went wrong',
            `${errorMsg}`,
            'error'
        )
        return;
    }

    // this takes the bounds and generates a results array to be displayed
    let results = generateFizzBuzz(first, second, innerBounds, outerBounds);

    /* this is to set a multiplier that was not necessary in the original code
        the commented out code is if you want to make the formatted table smaller
        to make it look nicer for even bounds, however the styling messes with the
        formatting. Otherwise put a 5 in the place of the variable multiplier
        and it will still work perfectly fine */
    let multiplier = 5;
    /* if ((outerBounds - innerBounds + 1) % 5 == 0) {
        multiplier = 5;
    } else if ((outerBounds - innerBounds + 1) % 4 == 0) {
        multiplier = 4;
    } else {
        multiplier = 5;
    } */

    //this generates the results array, the multiplier was for formatting
    displayResults(results, multiplier);
}

// This function takes the 4 values and pushes out an array list on whether or not things
// are fizz, buzz, or fizzbuzz
function generateFizzBuzz(first, second, innerBounds, outerBounds) {
    
    //creates an empty array to be used to hold all values
    let numbers = [];

    //a for loop that loops in between every value in the bounds
    for (let i = innerBounds; i <= outerBounds; i++) {

        // if the number is divisible by the first and second inputs it will
        // replace the number with fizz, buzz, or fizzbuzz and then save it to the array
        if (i % first == 0 && i % second == 0) {
            numbers.push("FizzBuzz");
        } else if (i % first == 0) {
            numbers.push("Fizz");
        } else if (i % second == 0) {
            numbers.push("Buzz");
        } else {
            numbers.push(i);
        }
    }
    return numbers;

}

// this is the function that displays the array
function displayResults(fizzBuzzData, multiplier) {

    //access the table body element on the DOM
    let tableBody = document.getElementById("output");

    //access the template element on the DOM
    let templateRow = document.getElementById("fbTemplate");
    
    //clear out any information currently in the table body
    tableBody.innerHTML = '';

    //go through the supplied FB information and fill out the table rows with it
    for (let index = 0; index < fizzBuzzData.length; index += multiplier) {

        //grab the inside of the template element, but not the template element itself
        const tableRow = document.importNode(templateRow.content, true);

        //tableRow represents the <tr> and all <td> from insdie the <template>
        //we only want to interact with the <td> elements
        let rowCols = tableRow.querySelectorAll("td");

        //this is taking the values in the array list and assigning it to a row/column on
        // the webpage and since the multiplier is 5, it's in rows of 5
        for (let i = 0; i < multiplier; i++) {
            rowCols[i].classList.add(fizzBuzzData[index + i]);
            rowCols[i].textContent = fizzBuzzData[index + i];
        }

        //adds the row to the end of the table body
        tableBody.appendChild(tableRow);
    }
}
