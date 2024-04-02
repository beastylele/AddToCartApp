import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    apiKey: "AIzaSyCxGfMbTvV1vwhZKse-WrKPZEgi4cZ-nQo",
    authDomain: "realtime-database-6f292.firebaseapp.com",
    databaseURL: "https://realtime-database-6f292-default-rtdb.firebaseio.com",
    projectId: "realtime-database-6f292",
    storageBucket: "realtime-database-6f292.appspot.com",
    messagingSenderId: "849859587512",
    appId: "1:849859587512:web:2790dc6d5707a1f9b7334d"
}
  

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  console.log(inputValue);
  push(shoppingListInDB, inputValue);
});
