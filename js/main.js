'use strict';
//Constantes que necesito del HTML
const list = document.querySelector('.js_listUl');
console.log("entro");

//--------------------------------------------------------------------

//Array con los datos de los usuarios
let userData = [];

//Array con amigos
let friends = [];

//-------------------------FASE 1-----------------------------------//
//------------------LISTADO DE USUARIOS-----------------------------//

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
        listener()
    }
};

//--------------------------------------------------------------------

//Coger los datos de la API
let url = 'https://randomuser.me/api/?results=10'
fetch(url)

    .then((response) => response.json())
    .then((data) => {
        userData = data.results;
        paintUsers()
        listener()
    });


//------------------------------FASE 2-------------------------------
//------------------------MARCAR COMO AMIGOS------------------------//

//Escuchar a cada usuario cuando le demos click (función manejadora)
function listener() {//Cojo cada li de la lista (ALL)
    const liUser = document.querySelectorAll(".js_liUser");

    for (const item of liUser) {
        item.addEventListener("click", handleClickUser);
    };
};

//--------------------------------------------------------------------

function handleClickUser(event) {


    const idUserSelected = event.currentTarget.id;  //A qué usuario le clicko
    //---------------------------------------------//
    //console.log(userData);
    //Para añadir a amigos
    const userFound = userData.find(friend => { //buscar entre los usuarios

        return friend.id.name === idUserSelected;
    });
    //console.log(friends);
    const friendFoundIndex = friends.findIndex(friend => { //buscar si está en el listado de favoritos
        return friend.id.name === idUserSelected;
    });
    if (friendFoundIndex === -1) { //No lo encontró
        friends.push(userFound); //Añádemelo
    }
    else { //eliminar de la lista de amigos
        friends.splice(friendFoundIndex, 1);
    }
    paintUsers();
}

//-----------------------------FASE 3---------------------------------
//------------------GARDAR/RECUPERAR DEL LOCALSTORAGE---------------//







