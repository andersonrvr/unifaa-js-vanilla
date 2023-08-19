import {
  filterProducts,
  formCreateProductFunction,
  formDeleteProductFunction,
  formUpdateProductFunction,
  mountPage,
  products,
} from "./functions.js";

const formCreate = document.querySelector("#form-create-product");
const formUpdate = document.querySelector("#form-update-product");
const formDelete = document.querySelector("#form-delete-product");

const productFilter = document.querySelector("#product-filter");
mountPage(products);

formCreate.addEventListener("submit", formCreateProductFunction);
formUpdate.addEventListener("submit", formUpdateProductFunction);
formDelete.addEventListener("submit", formDeleteProductFunction);

productFilter.addEventListener("input", filterProducts);
