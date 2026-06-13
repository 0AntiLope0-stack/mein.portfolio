//---------------//
// HTML ELEMENTE//
//---------------//

//***** INPUT *****//
let inp = document.getElementById("inp")

//***** BUTTON *****//
let add = document.getElementById("add")
let del = document.getElementById("del")

//***** LISTE *****//
let liste = document.getElementById("liste")

//----------------//
// LOCALSTORAGE KEY
//----------------//
const STORAGE_KEY = "tasks"

//----------------//
// ADD TASK
//----------------//

add.addEventListener("click", function() {
    let text = inp.value;

    if (!text) return;

    let items = document.createElement("li")
    let check = document.createElement("input")
    let delet = document.createElement("button")

    items.textContent = text;
    delet.textContent = "X"
    check.type = "checkbox"

    liste.appendChild(items);
    items.appendChild(check);
    items.appendChild(delet);

    // LÖSCH BUTTON
    delet.addEventListener("click", function() {
        items.remove()
        saveTasks()
    })

    // CHECKBOX CHANGE
    check.addEventListener("change", function() {
        saveTasks()
    })

    inp.value = ""

    saveTasks()
})

//----------------//
// RESET BUTTON
//----------------//

del.addEventListener("click", function() {
    liste.innerHTML = "";
    saveTasks()
})

//----------------//
// SAVE TASKS
//----------------//

function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#liste li").forEach(li => {
        let text = li.childNodes[0].textContent;
        let checked = li.querySelector("input").checked;

        tasks.push({
            text: text,
            checked: checked
        });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

//----------------//
// LOAD TASKS
//----------------//

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    tasks.forEach(task => {
        let items = document.createElement("li")
        let check = document.createElement("input")
        let delet = document.createElement("button")

        items.textContent = task.text;
        delet.textContent = "X"
        check.type = "checkbox"
        check.checked = task.checked;

        liste.appendChild(items);
        items.appendChild(check);
        items.appendChild(delet);

        delet.addEventListener("click", function () {
            items.remove()
            saveTasks()
        })

        check.addEventListener("change", function() {
            saveTasks()
        })
    });
}

//----------------//
// INIT
//----------------//

loadTasks();