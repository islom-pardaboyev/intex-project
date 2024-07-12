const form = document.querySelector("form");

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const username = evt.target.username.value;
    const password = evt.target.password.value;

    if (username === "" || password === "") {
        alert("Please fill both fields");
    } else {
        if (username !== "islom") {
            alert("Username is wrong");
        } else if (password !== "123") {
            alert("Password is wrong");
        } else {
            const regex = /[1-9]/;
            if (regex.test(password)) {
                const userData = {
                    username: username,
                    password: password
                };
                window.localStorage.setItem("userdata", JSON.stringify(userData));
                alert("Registration successful!");
                setTimeout(() => {
                    location.pathname = 'admin.html';
                }, 1000);
            } else {
                alert("Password must include a number");
            }
        }
    }
});