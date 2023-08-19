import {
  filterCustomers,
  formCreateCustomerFunction,
  formDeleteCustomerFunction,
  formUpdateCustomerFunction,
  mountPage,
  customers,
} from "./functions.js";

const formCreate = document.querySelector("#form-create-customer");
const formUpdate = document.querySelector("#form-update-customer");
const formDelete = document.querySelector("#form-delete-customer");

const customerFilter = document.querySelector("#customer-filter");
mountPage(customers);

formCreate.addEventListener("submit", formCreateCustomerFunction);
formUpdate.addEventListener("submit", formUpdateCustomerFunction);
formDelete.addEventListener("submit", formDeleteCustomerFunction);

customerFilter.addEventListener("input", filterCustomers);
