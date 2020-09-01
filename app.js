// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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
  const todo = item.parentElement; //define todo = parent of clicked element

  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    todo.classList.toggle("fall");
    // todo.remove(); // call function remove to delete todo
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //   CHECK MARK
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed"); //add class 'completed' for completedButton
  }
}
