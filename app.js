const todoForm = document.querySelector('form')
const todoInput = document.querySelector('#todo-input')
const todoListUL = document.querySelector('#todo-list')

let allToDos = getToDos();
updateList()

todoForm.addEventListener('submit',function(e){
    e.preventDefault();
    addToDo()
})

function addToDo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const toDoObject = {
            text:todoText,
            completed:false
        }
        allToDos.push(toDoObject);
        todoInput.value = "";
        updateList()
        saveToDos()
    }
}

function updateList(){
    todoListUL.innerHTML = "";
    allToDos.forEach((todo,todoIndex)=>{
        todoItem = createToDoItem(todo,todoIndex);
        todoListUL.append(todoItem)
    })
}

function createToDoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement('li');
    todoLI.className = `todo`;
    todoLI.innerHTML = `<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent"
                     xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class = "todo-text">
                    ${todo.text}
                </label>
                <button class="delete">
                    <svg fill="var(--secondary-color)" 
                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`
                
    const deleteButton = todoLI.querySelector('.delete');
    deleteButton.addEventListener('click',()=>{
        deleteToDoItem(todoIndex);
    })

    const todoCheckbox = todoLI.querySelector('input');
    todoCheckbox.addEventListener('change',()=>{
        allToDos[todoIndex].completed = todoCheckbox.checked;
        saveToDos()
    })
    todoCheckbox.checked = allToDos[todoIndex].completed;
    return todoLI;
}

function deleteToDoItem(todoIndex){
    allToDos = allToDos.filter((_ , i)=> i!=todoIndex);
    saveToDos();
    updateList();
}

function saveToDos(){
    const todoJson = JSON.stringify(allToDos)
    localStorage.setItem('todos',todoJson)
}

function getToDos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}