//----------------------------//
// ***** HTML ELEMENTE ***** //
//--------------------------//

let inp = document.getElementById("inp")//INPU//
let items = document.getElementById("items")//DROPDOWNMENÜ//

// ***** BUTTONS ***** //
let b1 = document.getElementById("b1")//HINZUFÜGEN//
let b2 = document.getElementById("b2")//LÖSCHEN//
let b3 = document.getElementById("b3")//ALLES LÖSCHEN//

// ***** DIE LISTE *****//
let list = document.getElementById("list")

//----------------------------//
// ***** BUTTON EVENTS ***** //
//--------------------------//

b1.addEventListener("click", function() {            // << ***** HINZUFÜGEN BUTTON << ***** //
let item = document.createElement("li")
let check = document.createElement("input")
let delet = document.createElement("button")

let text = inp.value
let selten = items.value

item.classList.add(selten);
item.textContent = text;
delet.textContent = "X"
check.type = "checkbox"

list.appendChild(item);
item.appendChild(check);
item.appendChild(delet);
inp.value = "";

delet.addEventListener("click", function() {
    item.remove()

})})

b3.addEventListener("click", function() {           // << ***** LISTE LÖSCHEN BUTTON << ***** //

    list.innerHTML = "";
});