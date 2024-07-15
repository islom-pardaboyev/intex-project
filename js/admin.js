"use strict"

document.querySelector("#username").textContent = JSON.parse(window.localStorage.getItem('userdata')).username;

let navbarList = document.querySelector('.list');
let poolCon = document.querySelector("#poolCon");
let poolsArray = JSON.parse(window.localStorage.getItem("poolsArray")) || [];

let addPoolModal = document.querySelector("#addPoolModal");
document.querySelector("#logout").addEventListener('click', () => {
    let logOut = confirm("Do you want to log out?");
    if (logOut) {
        setTimeout(() => {
            location.pathname = 'index.html';
            window.localStorage.clear();
        }, 300);
    }
});

navbarList.addEventListener('click', e => {
    if (e.target.matches('.navbar-item1')) {
        e.target.classList.add("!text-[#009398]", "!border-[#009398]");
        e.target.nextElementSibling.classList.remove("!text-[#009398]", "!border-[#009398]");
        renderPools(poolsArray.filter(item => item.category == "0"), poolCon);
    } else if (e.target.matches(".navbar-item2")) {
        e.target.classList.add("!text-[#009398]", "!border-[#009398]");
        e.target.previousElementSibling.classList.remove("!text-[#009398]", "!border-[#009398]");
        renderPools(poolsArray.filter(item => item.category == "1"), poolCon);
    }
});

function renderPools(arr, list) {
    list.innerHTML = "";
    arr.forEach(item => {
        let div = document.createElement("div");
        div.className = "w-full flex bg-white pt-[16px] pb-[12px] pl-[43px] pr-[48px] rounded-[30px] items-center justify-between";
        div.innerHTML = `
            <img src=${item.imgURl} width="110" height="41" alt="">
            <div class="flex flex-col">
                <div class="relative w-fit">
                    <span>${item.oldPrice} сум</span>
                    <img src="/images/admin/line.png" width="100" class="absolute top-1 left-0" alt="">
                </div>
                <strong class="text-[20px]">${item.newPrice} сум</strong>
            </div>
            <p class="text-[20px]">${item.count}</p>
            <p class="text-[20px]">${item.frame}</p>
            <div class="flex items-center gap-[18px]">
                <img class="cursor-pointer" onclick="editPool(${item.id})" src="./images/admin/edit-pool-icons.svg" alt="">
                <img class="cursor-pointer" onclick="deletePool(${item.id})" src="./images/admin/delete-pool-icon.svg" alt="">
            </div>
        `;
        list.appendChild(div);
    });
}

function deletePool(id) {
    const index = poolsArray.findIndex(pool => pool.id === id);
    poolsArray.splice(index, 1);
    window.localStorage.setItem("poolsArray", JSON.stringify(poolsArray));
    renderPools(poolsArray.filter(item => item.category == selectedCategory), poolCon);
}


function editPool(id) {
    const pool = poolsArray.find(pool => pool.id === id);

    addPoolModal.classList.add("!scale-100", "transition-all", "duration-300");
    addPoolModal.innerHTML = `
        <form style="box-shadow: 0px 5px 10px 0px #00000040;" class="absolute top-[50%] left-[50%] bg-gray-300 translate-x-[-50%] px-[113px] translate-y-[-50%] w-[1130px] pt-[41px] pb-[33px] bg-[#F8F8F8]">
            <label id="addImgCon" class="">
                <input type="file" class="hidden" id="chooseImg">
                <img id="choosen-img" class="mx-auto max-w-[631px] max-h-[316px]" src=${pool.imgURl} alt="">
            </label>
            <img onclick="closeModal()" src="./images/admin/close-modal.svg" class="absolute top-[41px] right-[41px] cursor-pointer">
            <div class="grid grid-cols-12 gap-3 mt-[24px]">
                <div class="col-span-6 gap-2">
                    <label class="flex flex-col gap-2">
                        <span>Категории</span>
                        <select name="category" class="p-2">
                            <option value="0" ${pool.category === "0" ? "selected" : ""}>Карасиные</option>
                            <option value="1" ${pool.category === "1" ? "selected" : ""}>Надувные</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Старая цена (сум)</span>
                        <input type="text" class="p-2" value="${pool.oldPrice}" placeholder="Старая цена (сум)" name="oldPrice">
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Цена со скидкой</span>
                        <input type="text" class="p-2" value="${pool.newPrice}" placeholder="Цена со скидкой" name="newPrice">
                    </label>
                </div>
                <div class="col-span-6 gap-2">
                    <label class="flex flex-col gap-2">
                        <span>Рамка</span>
                        <select name="frame" class="p-2">
                            <option value="1" ${pool.frame === "1" ? "selected" : ""}>Малярническая</option>
                            <option value="2" ${pool.frame === "2" ? "selected" : ""}>Рамка пугачёв</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Количество</span>
                        <input type="text" name="count" value="${pool.count}" class="p-2" placeholder="Количество">
                    </label>
                </div>
            </div>
            <button class="button h-[46px] flex items-center justify-center w-full px-[30px] cursor-pointer mt-[20px] bg-[#009398] text-white text-[20px] font-bold rounded-[29px]" id="submitForm">Сохранить изменения</button>
        </form>
    `;

    let chooseImg = document.querySelector("#chooseImg");
    chooseImg.addEventListener("change", e => {
        let img = document.querySelector("#choosen-img");
        img.src = URL.createObjectURL(e.target.files[0]);
    });

    addPoolModal.querySelector("form").addEventListener("submit", evt => {
        evt.preventDefault();

        pool.imgURl = document.querySelector("#choosen-img").src;
        pool.category = evt.target.category.value;
        pool.oldPrice = evt.target.oldPrice.value;
        pool.newPrice = evt.target.newPrice.value;
        pool.frame = evt.target.frame.value;
        pool.count = evt.target.count.value;

        window.localStorage.setItem("poolsArray", JSON.stringify(poolsArray));
        closeModal();
        renderPools(poolsArray.filter(item => item.category == pool.category), poolCon);
    });
}
  

renderPools(poolsArray.filter(item => item.category == "0"), poolCon);

function showModal() {
    addPoolModal.classList.add("!scale-100", "transition-all", "duration-300");
    addPoolModal.innerHTML = `
        <form style="box-shadow: 0px 5px 10px 0px #00000040;" class="absolute top-[50%] left-[50%] bg-gray-300 translate-x-[-50%] px-[113px] translate-y-[-50%] w-[1130px] pt-[41px] pb-[33px] bg-[#F8F8F8]">
            <label id="addImgCon" class="">
                <input type="file" class="hidden" id="chooseImg">
                <img id="choosen-img" class="mx-auto max-w-[631px] max-h-[316px]" src="./images/admin/addImg.png" alt="">
            </label>
            <img onclick="closeModal()" src="./images/admin/close-modal.svg" class="absolute top-[41px] right-[41px] cursor-pointer">
            <div class="grid grid-cols-12 gap-3 mt-[24px]">
                <div class="col-span-6 gap-2">
                    <label class="flex flex-col gap-2">
                        <span>Категории</span>
                        <select name="category" class="p-2">
                            <option value="0">Карасиные</option>
                            <option value="1">Надувные</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Старая цена (сум)</span>
                        <input type="text" class="p-2" placeholder="Старая цена (сум)" name="oldPrice">
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Цена со скидкой</span>
                        <input type="text" class="p-2" placeholder="Цена со скидкой" name="newPrice">
                    </label>
                </div>
                <div class="col-span-6 gap-2">
                    <label class="flex flex-col gap-2">
                        <span>Рамка</span>
                        <select name="frame" class="p-2">
                            <option value="1">Малярническая</option>
                            <option value="2">Рамка пугачёв</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span>Количество</span>
                        <input type="text" name="count" class="p-2" placeholder="Количество">
                    </label>
                </div>
            </div>
            <button class="button h-[46px] flex items-center justify-center w-full px-[30px] cursor-pointer mt-[20px] bg-[#009398] text-white text-[20px] font-bold rounded-[29px]" id="submitForm">Добавить продукт</button>
        </form>
    `;

    let chooseImg = document.querySelector("#chooseImg");
    chooseImg.addEventListener("change", e => {
        let img = document.querySelector("#choosen-img");
        img.src = URL.createObjectURL(e.target.files[0]);
    });

    addPoolModal.querySelector("form").addEventListener("submit", evt => {
        evt.preventDefault();
        const objData = {
            id: Date.now(),
            imgURl: document.querySelector("#choosen-img").src,
            category: evt.target.category.value,
            oldPrice: evt.target.oldPrice.value,
            newPrice: evt.target.newPrice.value,
            frame: evt.target.frame.value,
            count: evt.target.count.value
        };
        poolsArray.push(objData);
        window.localStorage.setItem("poolsArray", JSON.stringify(poolsArray));
        closeModal();
        renderPools(poolsArray.filter(item => item.category == "0"), poolCon);
    });
}

function closeModal() {
    const addPoolModal = document.querySelector("#addPoolModal");
    addPoolModal.classList.remove("!scale-100");
    addPoolModal.innerHTML = "";
}