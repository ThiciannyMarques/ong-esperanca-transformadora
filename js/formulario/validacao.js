const VAZIO = "Preencha este campo.";

function cpfValido(cpf) {
  const d = cpf.replace(/\D/g, "");

  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) {
    return false;
  }

  function digito(tamanho) {
    let soma = 0;

    for (let i = 0; i < tamanho; i++) {
      soma += Number(d[i]) * (tamanho + 1 - i);
    }

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
  }

  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

function dataValida(texto) {
  const data = new Date(texto + "T00:00:00");

  if (Number.isNaN(data.getTime())) {
    return "Informe uma data válida.";
  }

  if (data > new Date()) {
    return "A data de nascimento não pode ser futura.";
  }

  if (data.getFullYear() < 1900) {
    return "Informe uma data válida.";
  }

  return "";
}

const regras = {
  nome: function (v) {
    return v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5 ? "" : "Informe nome e sobrenome.";
  },
  email: function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Informe um e-mail válido, como nome@exemplo.com.";
  },
  cpf: function (v) {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v)) {
      return "Use o formato 000.000.000-00.";
    }

    return cpfValido(v) ? "" : "Este CPF não é válido.";
  },
  telefone: function (v) {
    return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(v) ? "" : "Use o formato (11) 99999-9999.";
  },
  nascimento: dataValida,
  cep: function (v) {
    return /^\d{5}-\d{3}$/.test(v) ? "" : "Use o formato 00000-000.";
  },
  logradouro: function (v) {
    return v.trim().length >= 3 ? "" : "Informe o logradouro.";
  },
  cidade: function (v) {
    return v.trim().length >= 2 ? "" : "Informe a cidade.";
  },
  estado: function (v) {
    return v ? "" : "Selecione o estado.";
  },
  modalidade: function (v) {
    return v ? "" : "Escolha uma modalidade de colaboração.";
  }
};

export function validarCampo(nome, valor) {
  const regra = regras[nome];

  if (!regra) {
    return "";
  }

  if (!valor || !String(valor).trim()) {
    return nome === "modalidade" ? regra("") : VAZIO;
  }

  return regra(String(valor));
}

export function validarFormulario(dados) {
  const erros = {};

  Object.keys(regras).forEach(function (nome) {
    const mensagem = validarCampo(nome, dados[nome]);

    if (mensagem) {
      erros[nome] = mensagem;
    }
  });

  return erros;
}
