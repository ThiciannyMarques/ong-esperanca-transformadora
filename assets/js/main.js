(function () {
  "use strict";

  function somenteDigitos(valor) {
    return valor.replace(/\D/g, "");
  }

  function mascaraCPF(valor) {
    var d = somenteDigitos(valor).slice(0, 11);
    return d
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  function mascaraTelefone(valor) {
    var d = somenteDigitos(valor).slice(0, 11);
    if (d.length <= 2) {
      return d.length ? "(" + d : "";
    }
    if (d.length <= 6) {
      return "(" + d.slice(0, 2) + ") " + d.slice(2);
    }
    if (d.length <= 10) {
      return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    }
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  function mascaraCEP(valor) {
    var d = somenteDigitos(valor).slice(0, 8);
    return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
  }

  function aplicarMascara(id, funcao) {
    var campo = document.getElementById(id);
    if (!campo) {
      return;
    }
    campo.addEventListener("input", function () {
      campo.value = funcao(campo.value);
    });
  }

  aplicarMascara("cpf", mascaraCPF);
  aplicarMascara("telefone", mascaraTelefone);
  aplicarMascara("cep", mascaraCEP);

  var form = document.getElementById("form-cadastro");
  var mensagem = document.getElementById("mensagem-sucesso");

  if (form && mensagem) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      mensagem.hidden = false;
      mensagem.focus();
      form.reset();
    });

    form.addEventListener("reset", function () {
      mensagem.hidden = true;
    });
  }
})();
