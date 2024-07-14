document.querySelector("#username").textContent = JSON.parse(window.localStorage.getItem('userdata')).username
let navbarList = document.querySelector('.list');
let chooseImg = document.querySelector("#chooseImg");
let addPoolModal = document.querySelector("#addPoolModal")
document.querySelector("#logout").addEventListener('click', () => {
    let logOut = confirm("do you want to log out")

    if (logOut) {
        setTimeout(() => {
            location.pathname = 'index.html'
            window.localStorage.clear()
        }, 300)
    }
})

addPoolModal.addEventListener("submit", e => {
    e.preventDefault()
})

navbarList.addEventListener('click', e => {
    if (e.target.matches('.navbar-item1')) {
        e.target.classList.add("!text-[#009398]", "!border-[#009398]")
        e.target.nextElementSibling.classList.remove("!text-[#009398]", "!border-[#009398]")
    } else if (e.target.matches(".navbar-item2")) {
        e.target.classList.add("!text-[#009398]", "!border-[#009398]")
        e.target.previousElementSibling.classList.remove("!text-[#009398]", "!border-[#009398]")
    }
})

chooseImg.addEventListener('change', evt => {
    document.querySelector("#addImgCon").innerHTML = `
        <img src=${URL.createObjectURL(evt.target.files[0])} class="w-[100%] h-[100%]">
    `
})