import React, { Component } from "react";
import "./style.css";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nomeCompleto: "",
        dataNascimento: "",
        cpf: "",
        telefoneFixo: "",
        celular: "",
        nomePai: "",
        nomeMae: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        emailValido: true,
        senhaValida: true,
        confirmarSenhaValida: true
      },
      errors: {},
      isMenorDeIdade: false
    };
  }

  validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    remainder = (remainder === 10 || remainder === 11) ? 0 : remainder;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    remainder = (remainder === 10 || remainder === 11) ? 0 : remainder;
    return remainder === parseInt(cpf.substring(10, 11));
  };

  validateTelefone = (telefone, tipo) => {
    const regexFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
    const regexCelular = /^\(\d{2}\) \d{5}-\d{4}$/;
    return tipo === "fixo" ? regexFixo.test(telefone) : regexCelular.test(telefone);
  };

  validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  validateSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  validateConfirmarSenha = (confirmarSenha) => {
    return this.state.senha === confirmarSenha;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => {
        const updatedFormData = { ...prevState.formData, [name]: value };
        let isMenorDeIdade = false;
        if (updatedFormData.dataNascimento) {
          const [day, month, year] = updatedFormData.dataNascimento.split("/").map(Number);
          const birthDate = new Date(year, month - 1, day);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          isMenorDeIdade = age < 18;
        }
      let emailValido = this.state.emailValido;
      let senhaValida = this.state.senhaValida;
      let confirmarSenhaValida = this.state.confirmarSenhaValida;
      if (name === "email") {
      emailValido = this.validateEmail(value);
      } else if (name === "senha") {
      senhaValida = this.validateSenha(value);
      } else if (name === "confirmarSenha") {
      confirmarSenhaValida = this.validateConfirmarSenha(value);
      }

    this.setState(
      {
        [name]: value,
        emailValido,
        senhaValida,
        confirmarSenhaValida,
      },
      () => {
        if (name === "confirmarSenha") {
          this.setState({
            confirmarSenhaValida: this.validateConfirmarSenha(value),
          });
        }
      }
    );
        return {
          formData: updatedFormData,
          isMenorDeIdade,
        };
      },
      this.validate
    );
  };

  validate = () => {
    const { formData } = this.state;
    let newErrors = {};
    if (!formData.nomeCompleto.includes(" ")) newErrors.nomeCompleto = "Insira nome e sobrenome";
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNascimento)) newErrors.dataNascimento = "Data inválida";
    if (!this.validateCPF(formData.cpf)) newErrors.cpf = "CPF inválido";
    if (!this.validateTelefone(formData.telefoneFixo, "fixo")) newErrors.telefoneFixo = "Telefone fixo inválido";
    if (!this.validateTelefone(formData.celular, "celular")) newErrors.celular = "Celular inválido";
    if (!/^\d{5}-\d{3}$/.test(formData.cep) && !/^\d{8}$/.test(formData.cep)) {
      newErrors.cep = "CEP inválido (XXXXX-XXX ou 8 dígitos numéricos)";
    }
    if (formData.endereco.trim() === "") newErrors.endereco = "Campo obrigatório";
    if (formData.numero.trim() === "") newErrors.numero = "Campo obrigatório";
    if (formData.cidade.trim() === "") newErrors.cidade = "Campo obrigatório";
    if (formData.estado.trim() === "") newErrors.estado = "Campo obrigatório";
    if (!this.validateEmail(formData.email)) newErrors.email = "Email inválido";
    if (!this.validateSenha(formData.senha)) newErrors.senha = "Senha inválida. Deve conter letras maiúsculas e minúsculas, números e caracteres especiais.";
    if (!this.validateConfirmarSenha(formData.confirmarSenha, formData.senha)) newErrors.confirmarSenha = "As senhas não coincidem";
    this.setState({ errors: newErrors });
  };

  render() {
    const { formData, errors, isMenorDeIdade } = this.state;
    return (
      <form className="form-container">
        <h2>Informações Pessoais</h2>
        <input name="nomeCompleto" onChange={this.handleChange} placeholder="Nome Completo" className={errors.nomeCompleto ? "error" : ""} />
        {errors.nomeCompleto && <span className="error-message">{errors.nomeCompleto}</span>}
        <input name="dataNascimento" onChange={this.handleChange} placeholder="Data de Nascimento (DD/MM/AAAA)" className={errors.dataNascimento ? "error" : ""} />
        {errors.dataNascimento && <span className="error-message">{errors.dataNascimento}</span>}
        <input name="cpf" onChange={this.handleChange} placeholder="CPF" className={errors.cpf ? "error" : ""} />
        {errors.cpf && <span className="error-message">{errors.cpf}</span>}
        <input name="telefoneFixo" onChange={this.handleChange} placeholder="Telefone Fixo (com DDD)" className={errors.telefoneFixo ? "error" : ""} />
        {errors.telefoneFixo && <span className="error-message">{errors.telefoneFixo}</span>}
        <input name="celular" onChange={this.handleChange} placeholder="Celular (com DDD)" className={errors.celular ? "error" : ""} />
        {errors.celular && <span className="error-message">{errors.celular}</span>}
        {isMenorDeIdade && (
          <>
            <h2>Informações Complementares</h2>
            <input name="nomePai" onChange={this.handleChange} placeholder="Nome do Pai" />
            <input name="nomeMae" onChange={this.handleChange} placeholder="Nome da Mãe" />
          </>
        )}
        <h2>Endereço</h2>
        <input name="cep" onChange={this.handleChange} placeholder="CEP" className={errors.cep ? "error" : ""} />
        {errors.cep && <span className="error-message">{errors.cep}</span>}
        <input name="endereco" onChange={this.handleChange} placeholder="Endereço" className={errors.endereco ? "error" : ""} />
        {errors.endereco && <span className="error-message">{errors.endereco}</span>}
        <input name="numero" onChange={this.handleChange} placeholder="Número" className={errors.numero ? "error" : ""} />
        {errors.numero && <span className="error-message">{errors.numero}</span>}
        <input name="complemento" onChange={this.handleChange} placeholder="Complemento (opcional)" />
        <input name="cidade" onChange={this.handleChange} placeholder="Cidade" className={errors.cidade ? "error" : ""} />
        {errors.cidade && <span className="error-message">{errors.cidade}</span>}
        <input name="estado" onChange={this.handleChange} placeholder="Estado" className={errors.estado ? "error" : ""} />
        {errors.estado && <span className="error-message">{errors.estado}</span>}
        <h2>Informações de conta</h2>
        <input type="email" name="email" value={this.state.formData.email} onChange={this.handleChange} placeholder="Email" className={this.state.errors.email ? "error" : ""}/> {this.state.errors.email && <span className="error-message">{this.state.errors.email}</span>}
        <input type="password" name="senha" value={this.state.formData.senha} onChange={this.handleChange} placeholder="Senha" className={this.state.errors.senha ? "error" : ""}/> {this.state.errors.senha && <span className="error-message">{this.state.errors.senha}</span>}
        <input type="password" name="confirmarSenha" value={this.state.formData.confirmarSenha} onChange={this.handleChange} placeholder="Confirmar Senha" className={this.state.errors.confirmarSenha ? "error" : ""} /> {this.state.errors.confirmarSenha && <span className="error-message">{this.state.errors.confirmarSenha}</span>}
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default Formulario;
