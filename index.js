/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
// setting up the databse
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3e8b9-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// global variables
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// button functionality (push input values to screen & database)
addButtonEl.addEventListener("click", function() {
    // adding to database
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    //clearing input field 
    clearInputFieldEl()
    // adding to on screen list
    appendItemToShoppingListEl(inputValue)
})
// refacored function for clearing input field
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
// refactored function for adding on screen list
function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}

// fetching items from database
onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())

    for (let i = 0; i < itemsArray.length; i++) {
        console.log(itemsArray[i])
        appendItemToShoppingListEl(itemsArray[i])
    }
})