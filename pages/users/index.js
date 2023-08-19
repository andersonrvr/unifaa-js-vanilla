import { filterUsers, mountPage, users } from "./functions.js";

const userFilter = document.querySelector("#user-filter");
mountPage(users);

userFilter.addEventListener("input", filterUsers);
