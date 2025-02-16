
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("myInput");
    const todoList = document.getElementById("myul"); 
    const addForm = document.querySelector(".add"); 

    // fonction pour creer un nouveau todo
    const addtodo = (todo) => {
        const html = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${todo}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        todoList.innerHTML += html;
    };

    
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const todo = addForm.add.value.trim();
        if (todo) {
            addtodo(todo);
            addForm.reset();
        }
    });

    // effacer un todo
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        }
    });

    // Filter selon search bar
    function filterTodos(todoPhrase) {
        const todos = document.querySelectorAll('.todos li');
        todos.forEach(function(todo) {
            const text = todo.querySelector("span").textContent.toLowerCase();

            if (text.includes(todoPhrase.toLowerCase())) {
                todo.style.setProperty("display", "block", "important");
            } else {
                todo.style.setProperty("display", "none", "important");
            }
        });
    }

    
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value;
        filterTodos(searchTerm);
    });
});
