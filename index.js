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
})


// fetching items from database
onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())
    // clear the data on list before adding new data
    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
        // adding variables to targer either keys(IDs) or values
        let currentItem = itemsArray[i] //selects both
        let currentItemID = currentItem[0] //selects the ID
        let currentItemValue = currentItem[1] //selects the value
        
        // add the items to the displayed list in app
        appendItemToShoppingListEl(currentItem)
    }
})


// refacored function for clearing input field
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
// refactored function for adding on screen list

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
}