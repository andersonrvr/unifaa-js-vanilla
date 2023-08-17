import { API } from "../../provider/api.js";

let productToUpdate;
let productToDelete;
export let products = await API.getAllProducts();
const updateProductBtn = document.getElementsByClassName("update-product");
const deleteProductBtn = document.getElementsByClassName("delete-product");

export const productCard = (
  name,
  price,
  observation,
  quantity,
  time,
  idProduct
) => {
  const productList = document.querySelector(".product-list");
  const card = document.createElement("div");
  card.className = "card";
  card.style = "min-width: 280px;";
  const timeSplitted = time.split("-");
  card.innerHTML = `
      <div class="card-body" >
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">R$${price}</h6>
        <p class="card-text">${observation}</p>
        <p class="card-text">Quantidade: ${quantity}</p>
        <p class="card-text text-body-secondary">Criação: ${timeSplitted[2]}/${timeSplitted[1]}/${timeSplitted[0]}</p>
        <a id="${idProduct}" class="btn btn-primary update-product" data-bs-toggle="modal" data-bs-target="#updateProductModal">Atualizar</a>
        <a id="${idProduct}" class="btn btn-danger delete-product" data-bs-toggle="modal" data-bs-target="#deleteProductModal">Deletar</a>
        </div>
    `;
  productList.appendChild(card);
  return card;
};

export const mountPage = async (productsParameteer) => {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";
  if (!productsParameteer) {
    products = await API.getAllProducts();
    productsParameteer = [...products];
  }
  productsParameteer.forEach((product) => {
    productCard(
      product.nome,
      product.valor,
      product.observacao,
      product.quantidadeEstoque,
      product.dataCadastro.split("T")[0],
      product.id
    );
  });

  if (updateProductBtn) {
    for (let i = 0; i < updateProductBtn.length; i++) {
      updateProductBtn[i].addEventListener("click", fillUpdateForm);
      deleteProductBtn[i].addEventListener("click", getProductToDelete);
    }
  }
};

export const formCreateProductFunction = async (e) => {
  e.preventDefault();
  const productData = {
    dataCadastro: new Date().toISOString(),
  };
  const formCreate = document.querySelector("#form-create-product");
  for (let i = 0; i < formCreate.length - 2; i++) {
    productData[formCreate[i].name] = formCreate[i].value;
  }
  const productCreated = await API.createProduct(productData);
  await mountPage();

  formCreate.reset();
  $("#close-modal-creation").click();
};

export const fillUpdateForm = async (e) => {
  console.log(e.target);
  console.log(e.currentTarget);
  const updateObs = document.querySelector("#updateObs");
  const updatePrice = document.querySelector("#updatePrice");
  const updateName = document.querySelector("#updateName");
  const updateQuantity = document.querySelector("#updateQuantity");

  productToUpdate = await API.getOneProduct(e.currentTarget.id);
  updateObs.value = productToUpdate.observacao;
  updatePrice.value = productToUpdate.valor;
  updateName.value = productToUpdate.nome;
  updateQuantity.value = productToUpdate.quantidadeEstoque;
};

export const getProductToDelete = (e) => (productToDelete = e.currentTarget.id);

export const formUpdateProductFunction = async (e) => {
  e.preventDefault();
  const productData = {
    dataCadastro: new Date().toISOString(),
  };
  const formUpdate = document.querySelector("#form-update-product");
  for (let i = 0; i < formUpdate.length - 2; i++) {
    productData[formUpdate[i].name] = formUpdate[i].value;
  }
  await API.updateProduct(productToUpdate.id, productData);

  await mountPage();
  $("#close-modal-update").click();
};

export const filterProducts = (e) => {
  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(e.target.value)
  );
  mountPage(filteredProducts);
};

export const formDeleteProductFunction = async (e) => {
  e.preventDefault();
  await API.deleteProduct(productToDelete);

  mountPage();
  $("#close-modal-delete").click();
};
