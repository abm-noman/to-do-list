// Global Variable
const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const emptyImage = document.querySelector(".empty-image");
const todoHtml = document.querySelector(".todo-list");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

// Show Todos on Page Load
showTodos();

// Function to Return Todo HTML
function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}"><i class="fa fa-times"></i></button>
    </li>`;
}

// Function to Show Todos
function showTodos() {
    if (todosJson.length === 0) {
        todoHtml.innerHTML = '';
        emptyImage.style.display = "block";
    } else {
        todoHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImage.style.display = "none";
    }
}

// Function to Add Todo
function addTodo() {
    let todo = input.value.trim();
    if (!todo) return;
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    input.value = "";
    showTodos();
}

// Add Event Listeners
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

addButton.addEventListener("click", addTodo);

// Function to Update Todo Status
function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    } else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

// Function to Remove Todo
function removeTodo(event) {
    if (!event.target.classList.contains('delete-btn')) return;
    const index = event.target.closest('.delete-btn').dataset.index;
    todosJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

todoHtml.addEventListener("click", removeTodo);

// Filter Todos
filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", (e) => {
        filters.forEach(btn => btn.classList.remove('active'));
        if (filterBtn.classList.contains('active')) {
            filterBtn.classList.remove('active');
            filter = '';
        } else {
            filterBtn.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showTodos();
    });
});

// Delete All Todos
deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});
