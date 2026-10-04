import { mascaras } from "./mascaras.js";
import { validarCampo, validarFormulario } from "./validacao.js";
import {
  listarCadastros,
  salvarCadastro,
  removerCadastro,
  lerRascunho,
  salvarRascunho,
  limparRascunho
} from "./armazenamento.js";
import { mostrarToast } from "../componentes/toast.js";
import { renderizarLista } from "../templates/engine.js";
import { modeloCadastro } from "../templates/modelos.js";

const ROTULOS = { voluntariado: "Voluntariado", doador: "Doador", ambos: "Ambos" };
const CAMPOS_SENSIVEIS = ["cpf"];

function lerDados(form) {
  return Object.fromEntries(new FormData(form));
}

function mostrarErro(form, nome, mensagem) {
  const aviso = form.querySelector("#erro-" + nome);

  if (aviso) {
    aviso.textContent = mensagem;
    aviso.hidden = !mensagem;
  }

  form.querySelectorAll('[name="' + nome + '"]').forEach(function (campo) {
    if (mensagem) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
  });
}

function limparErros(form) {
  Object.keys(lerDados(form)).concat(["modalidade"]).forEach(function (nome) {
    mostrarErro(form, nome, "");
  });
}

function mostrarAlerta(form, tipo, titulo, texto) {
  const alerta = form.querySelector("#alerta-form");

  alerta.className = "alerta alerta-" + tipo;
  alerta.setAttribute("role", tipo === "erro" ? "alert" : "status");
  alerta.innerHTML = "";

  const bloco = document.createElement("div");
  const forte = document.createElement("strong");
  const paragrafo = document.createElement("p");

  forte.textContent = titulo;
  paragrafo.textContent = texto;
  bloco.appendChild(forte);
  bloco.appendChild(paragrafo);
  alerta.appendChild(bloco);
  alerta.hidden = false;
  alerta.focus();
}

function restaurarRascunho(form) {
  const rascunho = lerRascunho();

  Object.keys(rascunho).forEach(function (nome) {
    const campos = form.querySelectorAll('[name="' + nome + '"]');

    campos.forEach(function (campo) {
      if (campo.type === "radio") {
        campo.checked = campo.value === rascunho[nome];
      } else {
        campo.value = rascunho[nome];
      }
    });
  });
}

function guardarRascunho(form) {
  const dados = lerDados(form);

  CAMPOS_SENSIVEIS.forEach(function (nome) {
    delete dados[nome];
  });

  salvarRascunho(dados);
}

function desenharCadastros(principal) {
  const lista = principal.querySelector("#lista-cadastros");
  const vazio = principal.querySelector("#sem-cadastros");
  const cadastros = listarCadastros().map(function (cadastro) {
    return Object.assign({}, cadastro, { modalidade: ROTULOS[cadastro.modalidade] || cadastro.modalidade });
  });

  lista.innerHTML = renderizarLista(modeloCadastro, cadastros);
  vazio.hidden = cadastros.length > 0;
}

export function iniciarFormulario(principal) {
  const form = principal.querySelector("#form-cadastro");

  if (!form) {
    return;
  }

  restaurarRascunho(form);
  desenharCadastros(principal);

  form.addEventListener("input", function (evento) {
    const campo = evento.target;
    const mascara = mascaras[campo.name];

    if (mascara) {
      campo.value = mascara(campo.value);
    }

    if (campo.getAttribute("aria-invalid") === "true") {
      mostrarErro(form, campo.name, validarCampo(campo.name, campo.value));
    }

    guardarRascunho(form);
  });

  form.addEventListener("focusout", function (evento) {
    const campo = evento.target;

    if (campo.name && campo.name !== "observacoes" && campo.type !== "radio") {
      mostrarErro(form, campo.name, validarCampo(campo.name, campo.value));
    }
  });

  form.addEventListener("change", function (evento) {
    if (evento.target.type === "radio") {
      mostrarErro(form, "modalidade", "");
      guardarRascunho(form);
    }
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const dados = lerDados(form);
    const erros = validarFormulario(dados);
    const nomes = Object.keys(erros);

    limparErros(form);

    if (nomes.length) {
      nomes.forEach(function (nome) {
        mostrarErro(form, nome, erros[nome]);
      });

      const primeiro = form.querySelector('[name="' + nomes[0] + '"]');

      mostrarAlerta(form, "erro", "Não foi possível enviar", "Corrija os campos destacados e tente novamente.");
      mostrarToast("Há campos com erro no formulário.", "erro");

      if (primeiro) {
        primeiro.focus();
      }

      return;
    }

    if (salvarCadastro(dados)) {
      mostrarAlerta(form, "sucesso", "Cadastro enviado", "Seus dados foram salvos neste navegador. Obrigado por apoiar a ONG!");
      mostrarToast("Cadastro salvo com sucesso!", "sucesso");
    } else {
      mostrarAlerta(form, "aviso", "Cadastro não salvo", "O navegador não permitiu guardar os dados. Verifique as configurações de armazenamento.");
      mostrarToast("Não foi possível salvar o cadastro.", "aviso");
    }

    limparRascunho();
    form.reset();
    desenharCadastros(principal);
  });

  form.addEventListener("reset", function () {
    limparErros(form);
    limparRascunho();
    form.querySelector("#alerta-form").hidden = true;
  });

  principal.querySelector("#lista-cadastros").addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-remover]");

    if (botao) {
      removerCadastro(botao.getAttribute("data-remover"));
      desenharCadastros(principal);
      mostrarToast("Cadastro removido.", "info");
    }
  });
}
