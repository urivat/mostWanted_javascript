/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO: Declare a searchByTrait function //////////////////////////////////////////
      searchResults = searchByTrait(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO: Declare a findPersonInfo function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help

      displayPerson(person[0], people);

      break;
    case "family":
      //! TODO: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      
      displayFamily(person, people);

      break;
    case "descendants":
      //! TODO: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person, people) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `dob: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eyecolor: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;

  //! TODO: finish getting the rest of the information to display //////////////////////////////////////////
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function searchByTrait(people) {
  let userSelectedProp = prompt(
    'which attribute would you like to search by: height, weight, eyeColor, occupation, Gender, DOB?  '
  );
  let userSelectedValue = prompt("What is the value of the attribute?");
  let foundObject = people.filter(function (traits) {
    try {
      if (traits[userSelectedProp].includes(userSelectedValue)) {
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (traits[userSelectedProp] === parseInt(userSelectedValue)) {
        return true;
      }
    }
  });
  return foundObject;
}

function displayFamily(person, people) {
  let parentfinder = findParents(person[0], people);
  let spouseFind = findSpouse(person[0], people);
  let siblingsFind = findSiblings(person[0],people)
  if(parentfinder.length == 0){
    alert(`This person has no parents`)
  }
  
  else if(parentfinder.length == 2){
    let firstParent = `First parent: ${parentfinder[0].firstName} ${parentfinder[0].lastName}`;
    let secondParent = `Second parent: ${parentfinder[1].firstName} ${parentfinder[1].lastName}`;
    alert(`${firstParent}\n ${secondParent}\n`)
  }
  
  if(spouseFind == 0){

    alert(`This person has no spouse.`)
  }
  
  else if(spouseFind.length === 1){

    let currentSpouse = `Current spouse: ${spouseFind[0].firstName} ${spouseFind[0].lastName}`;
    alert(`${currentSpouse}\n`)
  }
  if (siblingsFind.length == 0){
    alert(`This person does not have any siblings`)

  }else if(siblingsFind.length >= 1){

    let childOne = `First child is ${siblingsFind[0].firstName} ${siblingsFind[0].lastName}`;

    let childTwo = `Second child is ${siblingsFind[1].firstName} ${siblingsFind[1].lastName}`;


    alert(`${childOne} ${childTwo}`)
  }

}

function findSpouse(person, people) {
  let foundSpouse = people.filter(function (personEl) {


    if (person.currentSpouse=== personEl.id) return true;
  });


  return foundSpouse;
}

function findParents(person, people) {
  let foundParents = people.filter(function (personEl) {



    if (person.parents.includes(personEl.id)) {
      return true
    
    }else{
      return false
    }
    
  });


  return foundParents;
}
function findSiblings(person, people) {



  let foundSiblings = people.filter(function (personEl) {
    if (person.parents === personEl.parents) {
       

      return true
    
    }else{
      return false
    }
    
  });
  return foundSiblings;
}
function findDescendants(person, people) {



  let founddescendents = people.filter(function (personEl) {
    if (person.id.includes(personEl.parents)) {


      return true
    
    }else{
      return false
    }
    
  });
  return founddescendents;
}
