// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// functions
function addTodo(event) {
  // prevent form from submiting
  event.preventDefault();

  // create todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo"); //add class "todo" to element todoDiv

  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //give value to newTodo of value of todoInput
  newTodo.classList.add("todo-item"); //add class "todo-item" to element newTodo
  todoDiv.appendChild(newTodo); //put newTodo inside todoDiv element

  //ADD TODO TO LOCAL STORAGE
  if (todoInput.value.length !== 0) {
    saveLocalTodo(todoInput.value);
  } else {
    alert("ERROR\nPlease fill it first");
  }
  // create CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"><i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // create CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"><i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //   APPEND TO LIST, put todoDiv inside todoList element
  todoList.appendChild(todoDiv);
  //   clear todoInput value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target; //define item = clicked element
  const todoItem = item.parentElement; //define todoItem = parent of clicked element

  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    todoItem.classList.toggle("fall");
    removeTodoData(todoItem);
    // Animation first, then delete todoItem
    todoItem.addEventListener("transitionend", function () {
      todoItem.remove();
    });
  }

  //   CHECK MARK
  if (item.classList[0] === "complete-btn") {
    todoItem.classList.toggle("completed"); //add class 'completed' for completedButton
  }
}

function filterTodo(event) {
  const todoFiltered = todoList.childNodes;
  todoFiltered.forEach(function (filteredTodo) {
    switch (event.target.value) {
      case "all":
        filteredTodo.style.display = "flex"; //to show all item again when option "All" is clicked after choosing other option
        break;
      case "done":
        if (filteredTodo.classList.contains("completed")) {
          //if the filteredTodo CONTAINS class = completed, do this
          filteredTodo.style.display = "flex";
        } else {
          filteredTodo.style.display = "none";
        }
        break;
      case "notdone":
        if (!filteredTodo.classList.contains("completed")) {
          //if the filteredTodo DOESN'T contain class = completed, do this
          filteredTodo.style.display = "flex";
        } else {
          filteredTodo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  //Check if already have todo-data, if it's there get it, ifnot, todos = empty array
  let todos;
  todos = getTodoData(todos);

  //push the value of todos to exixting array then save (set) it to local storage
  todos.push(todo);
  localStorage.setItem("todo-data", JSON.stringify(todos));
}

function getTodos() {
  //Check if already have todo-data, if it's there get it, ifnot, todos = empty array
  let todos;
  todos = getTodoData(todos);

  //Create new todoDivs everytime the page loaded, with todo-data from local storage as subtitute for value of inputText, it literally just copy from function addTodo with a little change
  todos.forEach(function (todo) {
    // create todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); //add class "todo" to element todoDiv

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //give value to newTodo of value of todoInput
    newTodo.classList.add("todo-item"); //add class "todo-item" to element newTodo
    todoDiv.appendChild(newTodo); //put newTodo inside todoDiv element

    // create CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // create CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //   APPEND TO LIST, put todoDiv inside todoList element
    todoList.appendChild(todoDiv);
  });
}

function removeTodoData(todo) {
  let todos;
  todos = getTodoData(todos);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todo-data", JSON.stringify(todos));
}

function getTodoData(todos) {
  if (localStorage.getItem("todo-data") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo-data"));
  }
  return todos;
}
