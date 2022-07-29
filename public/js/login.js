const form = document.querySelector("form");

const status = (message, type) => {
    let div = document.createElement('div');
    div.classList.add("alert");
    div.classList.add(`alert-${type}`);
    div.innerText = message;
    document.querySelector("#status").appendChild(div);
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let params = {email: form.email.value, password: form.password.value};

    await fetch(`/api/users?email=${params.email}&password=${params.password}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data['code'] === 0) {
                status(data['message'], "success");

                setTimeout(() => {
                    window.location.replace(`/todos?user=${form.email.value}`)
                }, 500);

            } else if (data['code'] === 1) {
                status(data['message'], "danger");
            } else if (data['code'] === 2) {
                status(data['message'], "danger");
            }
        });
});