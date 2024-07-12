const form = document.querySelector("form");

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const username = evt.target.username.value;
    const password = evt.target.password.value;

    if (username && password) {
        const regex = /[1-9]/;

        if (regex.test(password)) {
            const userData = {
                username: username,
                password: password
            }
            window.localStorage.setItem("userdata", JSON.stringify(userData))
            alert("Registration successful!");
            setTimeout(() => {
                location.pathname = 'admin.html'
            }, 1000);

        } else {
            alert("Password must includes number");
        }

    } else {
        alert("Username and password are required.");
    }

});