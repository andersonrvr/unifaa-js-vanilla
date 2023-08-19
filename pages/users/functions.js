import { API } from "../../provider/api.js";

export let users = await API.getAllUsers();

export const userCard = (name, image, time, email) => {
  const userList = document.querySelector(".user-list");
  const card = document.createElement("div");
  card.className = "card";
  card.style = "min-width: 280px; max-width:280px";
  const timeSplitted = time.split("-");
  card.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img src=${image} class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${name}</p>
    <p class="card-text">${email}</p>
    <p class="card-text">Criação: ${timeSplitted[2]}/${timeSplitted[1]}/${timeSplitted[0]}</p>
  </div>
</div>
    `;
  userList.appendChild(card);
  return card;
};

export const mountPage = async (usersParameteer) => {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";
  if (!usersParameteer) {
    users = await API.getAllUsers();
    usersParameteer = [...users];
  }
  usersParameteer.forEach((user) => {
    userCard(user.nome, user.foto, user.dataCadastro.split("T")[0], user.email);
  });
};

export const filterUsers = (e) => {
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(e.target.value)
  );
  mountPage(filteredUsers);
};
