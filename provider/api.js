export class API {
  static baseUrl(endpoint) {
    return `http://localhost:3400/${endpoint}`;
  }
  static defaultHeaders(method, object) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      body: JSON.stringify(object),
    };
  }
  static defaultHeadersWithoutBody(method) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
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
  static async login(email, password) {
    try {
      const response = await fetch(
        this.baseUrl("login"),
        this.defaultHeaders("POST", { email: email, senha: password })
      );
      const json = await response.json();
      this.handleErrors(response, json);
      this.token = json.token;
      window.localStorage.setItem("@UNIFAA-token", json.token);
      window.open("/pages/products/index.html", "_self");
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  static async logout() {
    try {
      const response = await fetch(
        this.baseUrl("logout"),
        this.defaultHeadersWithoutBody("DELETE")
      );
      const json = await response.json();
      this.handleErrors(response, json);
      window.localStorage.clear();
      this.toastSucess("Usuário deslogado");
      window.open("/index.html", "_self");
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllUsers() {
    try {
      const response = await fetch(
        this.baseUrl("usuarios"),
        this.defaultHeadersWithoutBody("GET")
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
        this.defaultHeadersWithoutBody("GET")
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
        this.defaultHeadersWithoutBody("GET")
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
        this.defaultHeadersWithoutBody("GET")
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

  static async updateCustomer(id, object) {
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
        this.defaultHeadersWithoutBody("DELETE")
      );
      if (!response.ok) {
        const json = await response.json();
        this.handleErrors(response, json);
        return json;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProducts() {
    try {
      const response = await fetch(
        this.baseUrl("produtos"),
        this.defaultHeadersWithoutBody("GET")
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
        this.defaultHeadersWithoutBody("GET")
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

  static async updateProduct(id, object) {
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
        this.defaultHeadersWithoutBody("DELETE")
      );
      if (!response.ok) {
        const json = await response.json();
        this.handleErrors(response, json);
        return json;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
