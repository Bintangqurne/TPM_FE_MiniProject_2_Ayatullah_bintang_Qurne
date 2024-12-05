function _id(id) {
    return document.getElementById(id);
}

function _class(className) {
    return document.getElementsByClassName(className);
}

const inputSkill = _id('todo-title');
const addButton = _id('todo-add-btn');
const todoGallery = _id('todo-gallery');

addButton.addEventListener('click', addSkill);

const todoList = JSON.parse(localStorage.getItem('todoData')) ?? [];

function saveTodo() {
    localStorage.setItem('todoData', JSON.stringify(todoList));
}

function addSkill() {
    const title = inputSkill.value;
    if (title.length === 0) return;

    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        checked: false
    };

    todoList.push(newTodo);
    updateGallery();
    saveTodo();

    inputSkill.value = "";
}

function removeTodo(id) {
    const updatedList = todoList.filter(todo => todo.id !== id);
    todoList.length = 0;
    todoList.push(...updatedList);
    updateGallery();
    saveTodo();
}

function updateGallery() {
    todoGallery.innerHTML = "";

    todoList.forEach(todo => {
        const todoCard = document.createElement('div');
        todoCard.classList.add('w-[240px]', 'h-[40px]', 'flex', 'justify-normal', 'block', 'border', 'rounded-[100px]', 'pl-5', 'shadow-lg', 'text-black', 'text-[20px]', 'relative');
        todoCard.style.border = '1px solid #EDEDF9';

        todoCard.innerHTML = `
            <input 
                class="placeholder:text-slate-400 w-[180px]"  
                type="text" 
                name="title" 
                id="todo-title-${todo.id}" 
                placeholder="Add Hello..."
                value="${todo.title}" readonly
            >
            <button id="clear-input-btn-${todo.id}" class="text-black hover:text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2"> 
                <i class="fas fa-times text-xl"></i> 
            </button>
        `;

        todoGallery.appendChild(todoCard);

        const clearButton = _id(`clear-input-btn-${todo.id}`);
        if (clearButton) {
            clearButton.addEventListener('click', () => removeTodo(todo.id));
        }

        const todoInput = _id(`todo-title-${todo.id}`);
        if (todoInput) {
            todoInput.addEventListener('click', () => {
                if (todoInput.hasAttribute('readonly')) {
                    todoInput.removeAttribute('readonly');
                    todoInput.focus();
                }
            });

            todoInput.addEventListener('blur', () => {
                todo.title = todoInput.value;
                todoInput.setAttribute('readonly', true);
                saveTodo();
                updateGallery();
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', updateGallery);
