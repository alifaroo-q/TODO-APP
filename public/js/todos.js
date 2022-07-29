const form = document.querySelector("form");
const btnAdd = document.querySelector("#btn-add");
const todoTxt = document.querySelector("#todo-txt");

let user;

form.addEventListener("submit", (e) => {
    e.preventDefault()
});

window.addEventListener('load', async () => {
    await fetch(`/api/todos?email='${user}'`)
        .then((todos) => {
            return todos.json();
        })
        .then((todos) => {
            todos.forEach(todo => {

                addTodo(todo['todo'], todo['id'], todo['isDone']);

                document.getElementById(todo['id']).querySelector(".li-close")
                    .addEventListener("click", () => {
                        document.getElementById(todo['id']).remove();
                        fetch(`/api/todos/${todo['id']}`, {method: 'DELETE'}).then(() => {});
                    });

                document.getElementById(todo['id']).querySelector(".li-edit")
                    .addEventListener("click", () => {

                        document.getElementById(todo['id']).querySelector(".li-edit").disabled = true;

                        let updateTemplate = `
                            <div class="update-area" style="display: flex; align-items: baseline;">
                                <input class="newTodoTxt form-control" type="text" value='${todo['todo']}'>
                                <input style="margin-left: 10px" class="btn-update btn btn-primary mb-3" type="button" value="Update">
                            </div>
                        `;

                        const update = document.createRange().createContextualFragment(updateTemplate);
                        document.getElementById(`${todo['id']}`).appendChild(update);

                        document.getElementById(`${todo['id']}`).querySelector(".btn-update")
                            .addEventListener("click", () => {

                                const updatedTodo = document.getElementById(`${todo['id']}`)
                                    .querySelector(".newTodoTxt").value

                                const data = {
                                    method: 'PUT',
                                    body: JSON.stringify({id: todo['id'], todo: updatedTodo}),
                                    headers: new Headers({
                                        'Content-Type': 'application/json; charset=UTF-8'
                                    }),
                                };

                                if (!(updatedTodo === todo['todo'])) {
                                    fetch("/api/todos", data).then(() => {});
                                    document.getElementById(`todo-text-${todo['id']}`).innerText = updatedTodo;
                                }

                                document.getElementById(todo['id']).querySelector(".update-area").remove();
                                document.getElementById(todo['id']).querySelector(".li-edit").disabled = false;

                            });
                    });

                const checkBtn = document.getElementById(`done-${todo['id']}`);
                checkBtn.addEventListener("click", () => {

                    const data = {
                        method: 'PATCH',
                        headers: new Headers({
                            'Content-Type': 'application/json; charset=UTF-8'
                        })
                    };

                    if (checkBtn.classList.contains("fa-check")) {
                        checkBtn.classList.remove("fa-check");
                        checkBtn.classList.add("fa-check-double");
                        document.getElementById(`todo-text-${todo['id']}`).classList.add("strike");
                        data['body'] = JSON.stringify({id: todo['id'], done: 1})
                    } else {
                        checkBtn.classList.remove("fa-check-double");
                        checkBtn.classList.add("fa-check");
                        document.getElementById(`todo-text-${todo['id']}`).classList.remove("strike");
                        data['body'] = JSON.stringify({id: todo['id'], done: 0})
                    }

                    fetch("/api/todos", data).then(() => {});

                });
            });
        });
});

const addTodo = (todo, id, isDone) => {

    let todoTemplate = `
        <li style="display: inline" id='${id}'>
            <div style="display: flex; justify-content: space-between;" class="alert alert-primary">
                <span>
                    <i id='done-${id}' style="padding-right: 8px; cursor: pointer;" class="fa-solid fa-check"></i>
                    <span id='todo-text-${id}'> ${todo}</span>
                </span>
                <div>
                    <button type="button" class="li-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="li-close"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>        
        </li> 
    `;

    const li = document.createRange().createContextualFragment(todoTemplate);
    document.querySelector("#todos").appendChild(li);

    if (isDone) {
        document.getElementById(`done-${id}`).classList.remove('fa-check');
        document.getElementById(`done-${id}`).classList.add('fa-check-double');
        document.getElementById(`todo-text-${id}`).classList.add("strike");
    }

}

btnAdd.addEventListener("click", async () => {

    if (todoTxt.value === "") return;

    const data = {
        method: 'POST',
        body: JSON.stringify({todo: todoTxt.value, email: user}),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    };

    await fetch('/api/todos', data)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            addTodo(todoTxt.value, data.id, 0);
            todoTxt.value = "";
        })
        .finally(() => {
            location.reload();
        });
});


const loadUser = () => {
    const userID = document.querySelector("#userID");
    const params = new URLSearchParams(window.location.search);

    if (params.has('user')) {
        user = params.get('user');
    } else {
        user = 'default';
    }

    let h5 = document.createElement('h5');
    h5.innerHTML = `<strong><i class="fa-solid fa-user"></i> ${user}</strong>'s todo`;
    let br = document.createElement('br');
    userID.appendChild(br);
    userID.appendChild(h5);

};

loadUser();
