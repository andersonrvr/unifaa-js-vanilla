export class API {
  static baseUrl(endpoint) {
    return `http://localhost:3400/${endpoint}`;
  }
  static defaultHeaders(method, object, token) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify(token),
      },

      body: JSON.stringify(object),
    };
  }
  static set token(value) {
    localStorage.setItem("@UNIFAA-token", value);
  }
  static get token() {
    return localStorage.getItem("@UNIFAA-token");
  }

  static get statusErrors() {
    return [400, 401, 403, 404];
  }
  static handleErrors(response, json) {
    if (!response.ok) {
      $.toast({
        heading: json.name,
        text: json.mensagem,
        showHideTransition: "slide",
        icon: "error",
        position: "top-center",
      });

      throw Error(json.name);
    }
  }
  static toastSucess(message) {
    $.toast({
      heading: "Successo",
      text: message,
      showHideTransition: "slide",
      icon: "success",
      position: "top-center",
    });
  }
  static async register(object) {
    try {
      const response = await fetch(
        this.baseUrl("login"),
        this.defaultHeaders("POST", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async login(email, password) {
    try {
      const response = await fetch(
        this.baseUrl("login"),
        this.defaultHeaders("POST", { email: email, senha: password })
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async logout() {
    try {
      const response = await fetch(
        this.baseUrl("logout"),
        this.defaultHeaders("DELETE")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      this.toastSucess("Usuário deslogado");
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllUsers() {
    try {
      const response = await fetch(
        this.baseUrl("usuarios"),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOneUser(id) {
    try {
      const response = await fetch(
        this.baseUrl(`usuarios/${id}`),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllCustomers() {
    try {
      const response = await fetch(
        this.baseUrl("clientes"),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneCustomer(id) {
    try {
      const response = await fetch(
        this.baseUrl(`clientes/${id}`),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async createCustomer(object) {
    try {
      const response = await fetch(
        this.baseUrl("clientes"),
        this.defaultHeaders("POST", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateCustomer(id) {
    try {
      const response = await fetch(
        this.baseUrl(`clientes/${id}`),
        this.defaultHeaders("PUT", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteCustomer(id) {
    try {
      const response = await fetch(
        this.baseUrl(`clientes/${id}`),
        this.defaultHeaders("DELETE", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  /////////////////////////////////////////////////////////////
  static async getAllProducts() {
    try {
      const response = await fetch(
        this.baseUrl("produtos"),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneProduct(id) {
    try {
      const response = await fetch(
        this.baseUrl(`produtos/${id}`),
        this.defaultHeaders("GET")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async createProduct(object) {
    try {
      const response = await fetch(
        this.baseUrl("produtos"),
        this.defaultHeaders("POST", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(id) {
    try {
      const response = await fetch(
        this.baseUrl(`produtos/${id}`),
        this.defaultHeaders("PUT", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteProduct(id) {
    try {
      const response = await fetch(
        this.baseUrl(`produtos/${id}`),
        this.defaultHeaders("DELETE", object)
      );
      const json = await response.json();
      this.handleErrors(response, json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }
}
