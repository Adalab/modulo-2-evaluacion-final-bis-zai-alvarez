'use strict';
//Constantes que necesito del HTML
const list = document.querySelector('.js_listUl');
console.log("entro");
const buttonSave = document.querySelector('.js_buttonSave');
const buttonRecoverData = document.querySelector('.js_recoverData');

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
        let classFriend = "";
        //busco si mi usuario es favorito
        const friendFoundIndex = friends.findIndex(friend => {
            return friend.id.name === user.id;
        });

        if (friendFoundIndex !== -1) {
            classFriend = "isFriend";
        }
        else {
            classFriend = "";
        }

        list.innerHTML +=
            `<li class=" js_liUser ${classFriend} " id=${user.id.name}>
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

function handleClickUser(event) {

    event.preventDefault();

    //identificar a qué usuario le doy click
    const idUserSelected = event.currentTarget.id;

    // De cada amigo obtengo su id
    const userFriend = userData.find(friend => {
        return friend.id.name === idUserSelected;

    });
    // Para incluir la propiedad isFriend : true
    userFriend.isFriend = true;

    //para añadir o quitar de favoritos
    const friendFoundIndex = friends.findIndex(friend => { //buscar si está en el listado de favoritos
        return friend.id.name === idUserSelected;
    });
    if (friendFoundIndex === -1) { //No lo encontró
        friends.push(userFriend); //Añádemelo
    }
    else { //eliminar de la lista de amigos
        friends.splice(friendFoundIndex, 1);
    }
    paintUsers();
    console.log(friends);

};

//-----------------------------FASE 3---------------------------------
//------------------GARDAR/RECUPERAR DEL LOCALSTORAGE-----------------

function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

function loadUserData() {
    list.innerHTML = '';
    let saveUserData = JSON.parse(localStorage.getItem("userData"));
    const usersString = localStorage.getItem('userData');
    paintUsers(saveUserData);
    console.log(saveUserData);
}

buttonSave.addEventListener('click', saveUserData);
buttonRecoverData.addEventListener('click', loadUserData);




