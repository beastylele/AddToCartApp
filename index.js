import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  apiKey: "AIzaSyCxGfMbTvV1vwhZKse-WrKPZEgi4cZ-nQo",
  authDomain: "realtime-database-6f292.firebaseapp.com",
  databaseURL: "https://realtime-database-6f292-default-rtdb.firebaseio.com",
  projectId: "realtime-database-6f292",
  storageBucket: "realtime-database-6f292.appspot.com",
  messagingSenderId: "849859587512",
  appId: "1:849859587512:web:2790dc6d5707a1f9b7334d",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
// Database settings

const inputFieldEl = document.getElementById("input-field"); // gets the input field
const addButtonEl = document.getElementById("add-button"); // gets the add button
const shoppingListEl = document.getElementById("shopping-list"); // gets the ul for list

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value; // get value in the input field
  push(shoppingListInDB, inputValue); // pushes the value to the database

  clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    // turns DB object into array values

    clearShoppingListEl(); // clears to rewrite each time

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No Items here...yet";
  }
});
//updates database in real time



function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDb = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDb);
  });

  shoppingListEl.append(newEl);
}


function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}
