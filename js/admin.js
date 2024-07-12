let h1 = document.createElement("h1")
h1.textContent = JSON.parse(window.localStorage.getItem("userdata")).username
document.body.appendChild(h1)