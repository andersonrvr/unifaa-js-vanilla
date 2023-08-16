import { API } from "../../provider/api.js";

const productList = document.querySelector(".product-list");
const formCreate = document.querySelector("#form-create-product");

const productCard = (name, price, observation, quantity, time) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style = "min-width: 280px;";
  const timeSplitted = time.split("-");
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">R$${price}</h6>
      <p class="card-text">${observation}</p>
      <p class="card-text">Quantidade: ${quantity}</p>
      <p class="card-text text-body-secondary">Criação: ${timeSplitted[2]}/${timeSplitted[1]}/${timeSplitted[0]}</p>
      <a id='update-product' class="btn btn-primary">Atualizar</a>
      <a id='update-product' class="btn btn-danger">Deletar</a>
      </div>
  `;
  productList.appendChild(card);
  return card;
};

const mountPage = async () => {
  const products = await API.getAllProducts();
  products.forEach((product) => {
    productCard(
      product.nome,
      product.valor,
      product.observacao,
      product.quantidadeEstoque,
      product.dataCadastro.split("T")[0]
    );
  });
};

formCreate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productData = {
    dataCadastro: new Date().toISOString(),
  };
  for (let i = 0; i < formCreate.length - 1; i++) {
    productData[formCreate[i].name] = formCreate[i].value;
  }
  const productCreated = await API.createProduct(productData);
  productCard(
    productCreated.nome,
    productCreated.valor,
    productCreated.observacao,
    productCreated.quantidadeEstoque,
    productCreated.dataCadastro.split("T")[0]
  );
  $("#close-modal-creation").click();
});

mountPage();
