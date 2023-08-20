import { AUTENTICATION } from "../env.js";
import { API } from "./api.js";

const loginRegisterPages = ["http://localhost:5500/index.html"];

const logged = window.localStorage.getItem("@UNIFAA-token");

const navBarButtonsDiv = document.querySelector("#navBarRightButtons");
const notLoggedButtons = `<button class="btn btn-primary my-2 m-1 my-sm-0" id=
"btnLogin" type="button">Login</button>
`;
const loggedButton = `<button class="btn btn-outline-danger" id=
"btnLogout" my-2 m-1 my-sm-0" type="button">Sair</button>`;
const navBarLinksUl = document.querySelector("#navBarLinks");

if (
  logged &&
  AUTENTICATION &&
  loginRegisterPages.includes(window.location.href)
) {
  window.open("/pages/products/index.html", "_self");
}

if (
  !logged &&
  AUTENTICATION &&
  !loginRegisterPages.includes(window.location.href)
) {
  window.open("/index.html", "_self");
}

if (logged && AUTENTICATION) {
  navBarButtonsDiv.innerHTML = loggedButton;
  const btnLogout = document.querySelector("#btnLogout");
  btnLogout.addEventListener("click", async () => await API.logout());
} else {
  navBarButtonsDiv.innerHTML = notLoggedButtons;
  const btnLogin = document.querySelector("#btnLogin");
  btnLogin.addEventListener("click", () => window.open("/index.html", "_self"));
  if (AUTENTICATION) {
    navBarLinksUl.innerHTML = ``;
  }
}
