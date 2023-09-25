/* Isa Westling, lösning till uppgift 4 */

"use strict";

// Variabler
let newToDoEl = document.getElementById("newtodo");
let newToDoButtonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let toDoListEl = document.getElementById("todolist");
let clearbuttonEl = document.getElementById("clearbutton");
let i;

// Händelsehanterare
newToDoEl.addEventListener("keyup", checkItemText);
newToDoButtonEl.addEventListener("click", addItem);
clearbuttonEl.addEventListener("click", clearStorage);
window.onload = init;

// Initierings-funktion
function init() {

    // Inaktiverar lägg till-knappen
    newToDoButtonEl.disabled = true;

    // Läser in lagring
    loadStorage();
}

// Kontrollerar textens längd i input-fältet
function checkItemText() {
    let input = newToDoEl.value;
    if (input.length < 5) {
        message.innerHTML = "Ange minst fem tecken.";

        // Inaktiverar lägg till-knappen
        newToDoButtonEl.disabled = true;
    } else {
        message.innerHTML = "";

        // Aktiverar lägg till-knappen
        newToDoButtonEl.disabled = false;
    }
}

// Modifierar DOM genom att lägga till article + innehåll
function addItem() {
    let addedItem = newToDoEl.value;

    // Skapar nytt element
    let newEl = document.createElement("article");

    // Skapar ny textsträng med item som innehåll
    let newText = document.createTextNode(addedItem);

    // Lägger till textinnehåll i article-element
    newEl.appendChild(newText);

    // Lägger till class till elementet
    newEl.className = "listItem"

    // Lägger till article-element i att göra-listan
    toDoListEl.appendChild(newEl);

    // Klickhanterare som raderar elementen vid klick, anropar anonym funktion
    newEl.addEventListener("click", function (e) {
        e.target.remove();
    });

    // Rensar input-fält efter lyckad lagring
    newToDoEl.value = "";

    // Inaktiverar lägg till-knappen
    newToDoButtonEl.disabled = true;

    // Anropar lagring
    storeItem();
}

// Lagra till Web storage
function storeItem() {

    // Läser in listan
    let listItems = document.getElementsByClassName("listItem");

    // Skapar temporär array
    let tempArr = [];

    // Loopar genom listan och lagrar till temporär array
    for (i = 0; i < listItems.length; i++) {
        tempArr.push(listItems[i].innerHTML);
    }
    // Konverterar till JSON-sträng
    let jsonStr = JSON.stringify(tempArr);

    //Lagrar till Web storage
    localStorage.setItem("todolist", jsonStr);
}

// Läser in och laddar från Web storage
function loadStorage() {

    // Läser in och konverterar tillbaka JSON-sträng till array med lagrade värdet i todolist eller tom array om värdet är 0.
    let listItems = JSON.parse(localStorage.getItem("todolist")) || [];

    // Loopar igenom arrayen
    for (i = 0; i < listItems.length; i++) {

        // Skapar nya element
        let newEl = document.createElement("article");
        let newText = document.createTextNode(listItems[i]);
        newEl.appendChild(newText);
        newEl.className = "listItem"

        // Lägger till article-element i att göra-listan
        toDoListEl.appendChild(newEl);

        // Klickhanterare som raderar elementen vid klick, anropar anonym funktion
        newEl.addEventListener("click", function (e) {
            e.target.remove();

            // Lagrar listan på nytt
            storeItem();
        });
    }
}

// Rensar all lagring genom rensa-knappen (händelsehanterare)
function clearStorage() {
    localStorage.clear();

    // Återställer listan till tom
    toDoListEl.innerHTML = "";

    // Anropar utskrift
    loadStorage();
}