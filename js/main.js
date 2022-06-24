import FormComponent from "./components/form-component.js";
import todoValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const todoList = document.querySelector('.js-main-container');
const displayTodoItem = ({
  completed,
  title,
  id
}) => {
  const todoItemField = document.createElement('div'); // <div></div>
  todoItemField.className = '.js-item-container item-container d-flex flex-nowrap justify-content-center mt-2';
  

  const todoItem = document.createElement('div'); 
  todoItem.className = '.js-item item border border-white border-2 rounded my-auto py-2 d-flex'; 

  const checkbox = document.createElement('div');  // <div></div>
  checkbox.className = '.js-checkbox checkbox mx-2';  // <div class="checkbox"></div>
  if (completed) checkbox.classList.add('checked'); // <div class="checkbox checked"></div>
  checkbox.addEventListener('click', async () => {
    await ApiService.updateTodo({
      id,
      completed: !checkbox.classList.contains('checked')
    });

    checkbox.classList.toggle('checked');
  });

  const todoItemText = document.createElement('div'); // <div></div>
  todoItemText.className = '.js-item-text item-text'; // <div class="todo-list__item__text"></div>
  todoItemText.innerText = title; // <div class="todo-list__item__text">{{ title }}</div>

  const buttonsDeleteAndEdit = document.createElement('div'); // <div></div>
  buttonsDeleteAndEdit.className = '.js-buttons buttons d-inline-flex'; // <div class="todo-list__item"></div>

  const btnDelete = document.createElement('button'); // <button></button>
  btnDelete.className = '.btn-delete btn btn-primary py-0 ms-2'; 
  btnDelete.innerHTML = '<img class="button-img" src="assets/delete-button.png"/>';
  btnDelete.addEventListener('click',  async () => {
    await ApiService.deleteTodo(id);
    todoItem.remove();
  });

  const btnEdit = document.createElement('button'); // <button></button>
  btnEdit.className = '.btn-edit btn btn-primary ms-2';
  btnEdit.innerHTML = '<img class ="button-image" src="assets/edit-pen.png"/>';
  btnEdit.addEventListener('click', console.log("Paspausta edit"));
              
  todoItemField.append(  
    todoItem,       
    buttonsDeleteAndEdit,   
  ); 

  todoItem.append(
    checkbox,
    todoItemText,
  );

  buttonsDeleteAndEdit.append(
    btnDelete,
    btnEdit,
  );

  todoList.insertAdjacentElement('afterBegin', todoItemField);
}

// Kuriame Formos komponentą, kuris konstravimo metu paruošia validavimo procesą
const formAddTodo = new FormComponent(
  '.js-add-todo-form', /* selector */
  todoValidator, /* formatErrors */
  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  }
);

// Pradinių duomenų parsiuntimas
const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);


// fetch('https://localhost:1337/todos')
// fetch('https://jsonplaceholder.typicode.com/todos?userId=7')
  
//   .then((response) => response.json())
  
//   .then((items) => items.forEach(addTodoItem));





  

