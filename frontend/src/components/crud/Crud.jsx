import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "book",
  title: "Cadastro",
  subtitle: "Sistema de cadastro de animais para a Clínica Pegadas Pet 🐾",
};

const baseUrl = "http://localhost:3001/pets";
const initialState = {
  pet: { nome: "", raca: "", idade: "", tutor: "", contato: "" },
  list: [],
};

export default class petCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ pet: initialState.pet });
  }

  save() {
    const pet = this.state.pet;
    const method = pet.id ? "put" : "post";
    const url = pet.id ? `${baseUrl}/${pet.id}` : baseUrl;
    axios[method](url, pet).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ pet: initialState.pet, list });
    });
  }

  getUpdatedList(pet, add = true) {
    const list = this.state.list.filter((u) => u.id !== pet.id);
    if (add) list.unshift(pet);
    return list;
  }

  updateField(event) {
    const pet = { ...this.state.pet };
    pet[event.target.name] = event.target.value;
    this.setState({ pet });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-6 col-md-4">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={this.state.pet.nome}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome do pet..."
              />
            </div>
          </div>

          <div className="col-6 col-md-4">
            <div className="form-group">
              <label>Raça</label>
              <input
                type="text"
                className="form-control"
                name="raca"
                value={this.state.pet.raca}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a raça do pet..."
              />
            </div>
          </div>

          <div className="col-6 col-md-4">
            <div className="form-group">
              <label>Idade</label>
              <input
                type="text"
                className="form-control"
                name="idade"
                value={this.state.pet.idade}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a idade do pet..."
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6 col-md-4">
            <div className="form-group">
              <label>Tutor</label>
              <input
                type="text"
                className="form-control"
                name="tutor"
                value={this.state.pet.tutor}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome do tutor..."
              />
            </div>
          </div>

          <div className="col-6 col-md-4">
            <div className="form-group">
              <label>Contato</label>
              <input
                type="text"
                className="form-control"
                name="contato"
                value={this.state.pet.contato}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o contato do tutor..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button
              className="btn btn-outline-success"
              onClick={(e) => this.save(e)}
            >
              Salvar
            </button>

            <button
              className="btn btn-outline-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(pet) {
    this.setState({ pet });
  }

  remove(pet) {
    axios.delete(`${baseUrl}/${pet.id}`).then((resp) => {
      const list = this.getUpdatedList(pet, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Tutor</th>
            <th>Contato</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((pet) => {
      return (
        <tr key={pet.id}>
          <td>{pet.id}</td>
          <td>{pet.nome}</td>
          <td>{pet.raca}</td>
          <td>{pet.idade}</td>
          <td>{pet.tutor}</td>
          <td>{pet.contato}</td>
          <td>
            <button
              className="btn btn-outline-warning"
              onClick={() => this.load(pet)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-outline-danger ml-2"
              onClick={() => this.remove(pet)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
