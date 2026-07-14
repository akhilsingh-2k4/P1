const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const pendingCount = document.getElementById('pending-count');
const clearBtn = document.getElementById('clear-completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updatePendingCount() {
    const pending = todos.filter(t => !t.completed).length;
    pendingCount.textContent = `${pending} pending`;
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, span, deleteBtn);
    return li;
}

function renderTodos() {
    list.innerHTML = '';
    todos.forEach(todo => list.appendChild(createTodoElement(todo)));
    updatePendingCount();
}

function addTodo(text) {
    const todo = {
        id: Date.now(),
        text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = '';
    }
});

clearBtn.addEventListener('click', clearCompleted);

renderTodos();