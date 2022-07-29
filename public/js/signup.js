const terms = document.querySelector("#terms");
const btnSubmit = document.querySelector("#btn-submit");

const form = document.querySelector("form");

terms.addEventListener("click", () => {
    if (terms.checked) {
        btnSubmit.classList.remove("disabled");
    } else {
        btnSubmit.classList.add("disabled");
    }
});

const status = (message, type) => {
    let div = document.createElement('div');
    div.classList.add("alert");
    div.classList.add(`alert-${type}`);
    div.innerText = message;
    document.querySelector("#status").appendChild(div);
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
        email: form.email.value,
        password: form.password.value,
        first_name: form.first_name.value,
        last_name: form.last_name.value
    };

    const data = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    };

    await fetch('/api/users', data)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            if (data['code'] === 0) {
                status(data['message'], "success");

                setTimeout(() => {
                    window.location.replace("/")
                }, 1000);

            } else {
                status(data['message'], "danger");
            }
        });
});