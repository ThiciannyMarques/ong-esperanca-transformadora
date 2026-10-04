const CHAVE_CADASTROS = "ong:cadastros";
const CHAVE_RASCUNHO = "ong:rascunho";

function ler(chave, padrao) {
  try {
    const valor = JSON.parse(window.localStorage.getItem(chave));

    return valor === null ? padrao : valor;
  } catch (erro) {
    return padrao;
  }
}

function gravar(chave, valor) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));

    return true;
  } catch (erro) {
    return false;
  }
}

export function listarCadastros() {
  return ler(CHAVE_CADASTROS, []);
}

export function salvarCadastro(dados) {
  const cadastros = listarCadastros();
  const registro = {
    id: Date.now().toString(36),
    nome: dados.nome,
    email: dados.email,
    modalidade: dados.modalidade,
    criadoEm: new Date().toISOString()
  };

  cadastros.push(registro);

  return gravar(CHAVE_CADASTROS, cadastros);
}

export function removerCadastro(id) {
  const restantes = listarCadastros().filter(function (cadastro) {
    return cadastro.id !== id;
  });

  gravar(CHAVE_CADASTROS, restantes);
}

export function lerRascunho() {
  return ler(CHAVE_RASCUNHO, {});
}

export function salvarRascunho(dados) {
  gravar(CHAVE_RASCUNHO, dados);
}

export function limparRascunho() {
  try {
    window.localStorage.removeItem(CHAVE_RASCUNHO);
  } catch (erro) {
    return;
  }
}
