'use strict';
//Constantes que necesito del HTML
const list = document.querySelector('.js_listUl');
console.log("entro");
//Constantes creadas

//Array con los datos de los usuarios
let userData = [];

//Array con amigos
let friends = [];

//Pintar en el HTML los usuarios
function paintUsers() {
    for (const user of userData) {
        list.innerHTML +=
            `<li class="js_listUser js_liUser" id=${user.id.name}>
        <h2>"${user.name.first}"</h2>
        <h3>${user.location.city}</h3>
        <img src="${user.picture.medium}"/>
        <h3>${user.login.username}</h3>
        </li>`;
    }
};

//Coger los datos de la API
let url = 'https://randomuser.me/api/?results=10'
fetch(url)

    .then((response) => response.json())
    .then((data) => {
        userData = data.results;
        paintUsers()
        listener()
    });


function handleClickUser(event) {
    console.log("asdf");
    console.log(event.currentTarget.id);
}

//Escuchar a cada usuario cuando le demos click
function listener() {
    const liUser = document.querySelectorAll(".js_liUser");
    console.log(liUser);
    for (const item of liUser) {
        item.addEventListener("click", handleClickUser);
    };
};


