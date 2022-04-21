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
        let classFriend = "";
        const friendFoundIndex = friends.findIndex(friend => {
            return friend.id === user;
        });
        if (friendFoundIndex !== -1) {
            classFriend = "friend_marker"
        }
        else {
            classFriend = "";
        }
        list.innerHTML +=
            `<li class="js_listUser js_liUser ${classFriend}" id=${user.id.name}>
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
    console.log(event.currentTarget.id);
    const idUserSelected = event.currentTarget.id;  //A qué usuario le clicko
    //---------------------------------------------//

    //Para añadir a amigos
    const userFound = userData.find(friend => { //buscar entre los usuarios
        return friend.id === idUserSelected;
    });
    const friendFoundIndex = friends.findIndex(friend => { //buscar si está en el listado de favoritos
        return friend.id === idUserSelected;
    });
    if (friendFoundIndex === -1) { //No lo encontró
        friends.push(userFound); //Añádemelo
    }
    else { //eliminar de la lista de amigos
        friends.splice(friendFoundIndex, 1);
    }
    paintUsers();
    console.log(friends); //Este no me lo está cogiendo
}


//Escuchar a cada usuario cuando le demos click (función manejadora)
function listener() {//Cojo cada li de la lista (ALL)
    const liUser = document.querySelectorAll(".js_liUser");
    console.log(liUser);
    for (const item of liUser) {
        item.addEventListener("click", handleClickUser);
    };
};




