const toDoForm = document.querySelector(".js-form"),
    toDoInput = toDoForm.querySelector("input"),
    toDoPending = document.querySelector(".pendingList"),
    toDoFinished = document.querySelector(".finishedList");

const TODOS_LS = "todos";

let toDos = [];
let newId = 0;

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoPending.removeChild(li);
    const cleanTodos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createPending(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "✅"
    li.appendChild(span);
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(saveBtn);
    toDoPending.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    newId++;
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    createPending(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (TODOS_LS !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            createPending(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();