// Global Variable
const input = document.querySelector("input");
const addButton = document.querySelector("add-button");
const emptyImage = document.querySelector("empty-image");
const todoHtml = document.querySelector("todos");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

// Define getTodoHtml method to return Todo HTML
function getTodoHtml(todo, index) {
    let checked = todo.status == "completed" ? "checked" : "";
    return `<li class="todo">
    <label for = "${index}">
    <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
    <span class="${checked}">${todo.name}</span>
    </label>
    <button class="delete-btn" data-index="${index}" onclick="${remove(this)}"><i class="fa fa-times"></i></button>
    </li>`;
}

function showTodos() {
    if (todosJson.length == 0) {
        todoHtml.innerHTML = '';
        emptyImage.style.display = "block";
    } else {
        todoHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = "none";
    }
}

// Define Add Todo method and listeners
function addTodo() {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key != "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});