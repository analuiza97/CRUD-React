import React from "react";
import Main from "../template/Main";

export default (props) => (
  <Main
    icon="home"
    title="Início"
    subtitle="Sistema de cadastro de animais para a Clínica Pegadas Pet"
  >
    <div className="display-4">Clínica Pegadas Pet 🐾</div>
    <hr />
    <p className="mb-0">
      Para cadastrar um animal, selecione "Cadastro" na barra lateral.
    </p>
  </Main>
);
