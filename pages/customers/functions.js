import { API } from "../../provider/api.js";

let customerToUpdate;
let customerToDelete;
export let customers = await API.getAllCustomers();
const updateCustomerBtn = document.getElementsByClassName("update-customer");
const deleteCustomerBtn = document.getElementsByClassName("delete-customer");

export const customerCard = (name, email, tel, cpfOrCnpj, time, idCustomer) => {
  const customerList = document.querySelector(".customer-list");
  const card = document.createElement("div");
  card.className = "card";
  card.style = "min-width: 280px;";
  const timeSplitted = time.split("-");
  card.innerHTML = `
      <div class="card-body" >
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${email}</h6>
        <p class="card-text">Telefone: ${tel}</p>
        <p class="card-text">CPF/CNPJ: ${cpfOrCnpj}</p>
        <p class="card-text text-body-secondary">Criação: ${timeSplitted[2]}/${timeSplitted[1]}/${timeSplitted[0]}</p>
        <a id="${idCustomer}" class="btn btn-primary update-customer" data-bs-toggle="modal" data-bs-target="#updateCustomerModal">Atualizar</a>
        <a id="${idCustomer}" class="btn btn-danger delete-customer" data-bs-toggle="modal" data-bs-target="#deleteCustomerModal">Deletar</a>
        </div>
    `;
  customerList.appendChild(card);
  return card;
};

export const mountPage = async (customersParameteer) => {
  const customerList = document.querySelector(".customer-list");
  customerList.innerHTML = "";
  if (!customersParameteer) {
    customers = await API.getAllCustomers();
    customersParameteer = [...customers];
  }
  customersParameteer.forEach((customer) => {
    customerCard(
      customer.nome,
      customer.email,
      customer.telefone,
      customer.cpfOuCnpj,
      customer.dataCadastro.split("T")[0],
      customer.id
    );
  });

  if (updateCustomerBtn) {
    for (let i = 0; i < updateCustomerBtn.length; i++) {
      updateCustomerBtn[i].addEventListener("click", fillUpdateForm);
      deleteCustomerBtn[i].addEventListener("click", getCustomerToDelete);
    }
  }
};

export const formCreateCustomerFunction = async (e) => {
  e.preventDefault();
  const customerData = {
    dataCadastro: new Date().toISOString(),
  };
  const formCreate = document.querySelector("#form-create-customer");
  for (let i = 0; i < formCreate.length - 2; i++) {
    customerData[formCreate[i].name] = formCreate[i].value;
  }
  const CustomerCreated = await API.createCustomer(customerData);
  await mountPage();

  formCreate.reset();
  $("#close-modal-creation").click();
};

export const fillUpdateForm = async (e) => {
  const updateCpfOrCnpj = document.querySelector("#updateCpfOrCnpj");
  const updateTel = document.querySelector("#updateTel");
  const updateName = document.querySelector("#updateName");
  const updateEmail = document.querySelector("#updateEmail");

  customerToUpdate = await API.getOneCustomer(e.currentTarget.id);
  updateCpfOrCnpj.value = customerToUpdate.cpfOuCnpj;
  updateTel.value = customerToUpdate.telefone;
  updateName.value = customerToUpdate.nome;
  updateEmail.value = customerToUpdate.email;
};

export const getCustomerToDelete = (e) =>
  (customerToDelete = e.currentTarget.id);

export const formUpdateCustomerFunction = async (e) => {
  e.preventDefault();
  const customerData = {
    dataCadastro: new Date().toISOString(),
  };
  const formUpdate = document.querySelector("#form-update-customer");
  for (let i = 0; i < formUpdate.length - 2; i++) {
    customerData[formUpdate[i].name] = formUpdate[i].value;
  }
  await API.updateCustomer(customerToUpdate.id, customerData);

  await mountPage();
  $("#close-modal-update").click();
};

export const filterCustomers = (e) => {
  const filteredCustomers = customers.filter((customer) =>
    customer.nome.toLowerCase().includes(e.target.value)
  );
  mountPage(filteredCustomers);
};

export const formDeleteCustomerFunction = async (e) => {
  e.preventDefault();
  await API.deleteCustomer(customerToDelete);

  mountPage();
  $("#close-modal-delete").click();
};
