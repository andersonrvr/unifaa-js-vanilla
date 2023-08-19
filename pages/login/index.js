import { API } from "../../provider/api.js";

const formLogin = document.querySelector("#form-login");
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  await API.login(formLogin[0].value, formLogin[1].value);
});
