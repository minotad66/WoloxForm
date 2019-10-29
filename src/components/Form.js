import React, { Component, Fragment } from "react";
import Counter from "./Counter";
class Form extends Component {
  state = {
    count: 0,
    email: "",
    password: "",
    age: "",
    name: "",
    lastname: "",
    isInValid: true,
    errors: {
      email: "",
      password: "",
      age: "",
      name: "",
      lastname: ""
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleOnChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
    this.executeValidations(id, value);
  };

  executeValidations = (id, value) => {
    const { errors } = this.state;

    let error = value.length === 0 ? "El campo es requerido" : "";
    if (
      (id === "email" && value.length > 0)
    ) {
      error = this.validateEmail(value) ? "" : "El campo no es un email";
    }
    if (id === "password" && value.length > 0) {
      error = this.validatePassword(value) ? "" : "El campo no es un password";
    }
    if (id === "age" && value.length > 0) {
      error = this.validateAge(value) ? "" : "El campo no es un numerico";
    }

    if (
      id === "name" && value.length > 0){
      error = value.length > 1 ? "" : "Debe tener minimo 2 letras";
    }

    if (id === "lastname" && value.length > 0){
      error = value.length > 1 ? "" : "Debe tener minimo 2 letras";
    }

    errors[id] = error;
    this.setState({
      errors
    });
    if (
      errors.email.length !== 0 ||
      errors.password.length !== 0 ||
      errors.age.length !== 0 ||
      errors.name.length !== 0 ||
      errors.lastname.length !== 0
    ) {
      this.setState({ isInValid: true });
    } else {
      this.setState({ isInValid: false });
    }
  };

  handleCounterClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  validatePassword = value => {
    //Expresion regular para comprobar que hayan mayusculas, minunculas, numeros y caracteres especiales-
    const regExpPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/i
    );
    console.log("esto es una prueba", regExpPassword.test(value));
    return regExpPassword.test(value);
  };

  validateEmail = value => {
    const regExpMail = new RegExp(
      /^(([^<>()*#$`~'"=+!¡¿?%^&{}/äáàëéèíìöóòúùñ|ºª·ç¨\[\]\.,;:\s@\"]+(\.[^<>()*#$`~'"=+!¡¿?%^&{}/äáàëéèíìöóòúùñ|ºª·ç¨\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    console.log("cualquier cosa", regExpMail.test(value));

    return regExpMail.test(value);
  };

  validateAge = value => {
    const regExpAge = /^([0-9])*$/;

    console.log("edad", regExpAge.test(value) && value > 0 && value < 100);

    return regExpAge.test(value) && value > 0 && value < 100;
  };

  render() {
    return (
      <Fragment className="wrapper">
        <div className="form-wrapper">
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="name">
              <label htmlFor="name"> Nombre: </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={this.handleOnChange}
              />
              {<span className="error">{this.state.errors.name}</span>}
            </div>
            <div className="name">
              <label htmlFor="lastname">Apellido: </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                onChange={this.handleOnChange}
              />
              {<span className="error">{this.state.errors.lastname}</span>}
            </div>
            <div className="name">
              <label htmlFor="age">Edad: </label>
              <input
                id="age"
                type="text"
                name="age"
                onChange={this.handleOnChange}
              />
              {<span className="error">{this.state.errors.age}</span>}
            </div>
            <div className="name">
              <label htmlFor="age">Email: </label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={this.handleOnChange}
              />
              {<span className="error">{this.state.errors.email}</span>}
            </div>

            <div className="name">
              <label htmlFor="password">password: </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={this.handleOnChange}
              />
              {<span className="error">{this.state.errors.password}</span>}
            </div>

            <button
              className={this.state.isInValid ? 'button' : ''}
              type="submit"
              value="Enviar"
              disabled={this.state.isInValid}
            >
              enviar
            </button>
          </form>
          <Counter
            count={this.state.count}
            handleCounterClick={this.handleCounterClick}
          />
        </div>
      </Fragment>
    );
  }
}
export default Form;
