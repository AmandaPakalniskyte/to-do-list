import FormComponent from "./components/form-component.js";
import todoValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const todoList = document.querySelector('.js-main-container');
const displayTodoItem = ({
  completed,
  title,
  id
}) => {
  const todoItemField = document.createElement('div');
  todoItemField.className = '.js-item-container item-container d-flex flex-nowrap justify-content-center mt-2';

  const todoItem = document.createElement('div');
  todoItem.className = '.js-item item border border-white border-2 rounded my-auto py-2 d-flex';

  const checkbox = document.createElement('div');
  checkbox.className = '.js-checkbox checkbox mx-2';
  if (completed) checkbox.classList.add('checked');
  checkbox.addEventListener('click', async () => {
    await ApiService.updateTodo({
      id,
      completed: !checkbox.classList.contains('checked')
    });
    checkbox.classList.toggle('checked');
  });

  const todoItemText = document.createElement('div');
  todoItemText.className = '.js-item-text item-text';
  todoItemText.innerText = title;

  const buttonsDeleteAndEdit = document.createElement('div');
  buttonsDeleteAndEdit.className = '.js-buttons buttons d-inline-flex';

  const btnDelete = document.createElement('button');
  btnDelete.className = '.btn-delete btn btn-primary mx-2';
  btnDelete.innerHTML = '<img class="button-img" src="assets/delete-button.png"/>';
  btnDelete.addEventListener('click', async () => {
    await ApiService.deleteTodo(id);
    todoItem.remove();
  });

  todoItemField.append(
    todoItem,
  );

  buttonsDeleteAndEdit.append(
    btnDelete,

  );
  todoItem.append(
    checkbox,
    todoItemText,
    buttonsDeleteAndEdit
  );

  todoList.insertAdjacentElement('afterBegin', todoItemField);
}

const formAddTodo = new FormComponent(
  '.js-add-todo-form',
  todoValidator,
  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  }
);

const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);

const numberOfInputs = todoList.children.length;
console.log(numberOfInputs);

const progressItem = document.querySelector('.js-progress-field');
console.log(progressItem);

const arrayDiv = new Array();
console.log(arrayDiv);
for (let i = 0; i < numberOfInputs; i++) {
  arrayDiv[i] = document.createElement('div');
  progressItem.appendChild(arrayDiv[i]);
};

const numberOfCheckedItems = document.querySelectorAll(".checked").length;
console.log(numberOfCheckedItems);

const allInputsInProgressField = document.querySelectorAll('.js-progress-field > div');
console.log(allInputsInProgressField);
const allInputsInProgressFieldArr = Array.from(allInputsInProgressField);
console.log(allInputsInProgressFieldArr);
for (let i = 0; i < numberOfCheckedItems; i++) {
  allInputsInProgressFieldArr[i].classList.add("completed");
};

