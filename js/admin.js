document.querySelector("#username").textContent = JSON.parse(window.localStorage.getItem('userdata')).username
document.querySelector("#logout").addEventListener('click', () => {
    let logOut = confirm("do you want to log out")

    if(logOut){
        setTimeout(() => {
            location.pathname = 'index.html'
            window.localStorage.clear()
        }, 300)
    }
})