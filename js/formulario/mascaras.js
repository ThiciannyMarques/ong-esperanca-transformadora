function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

export function mascaraCPF(valor) {
  const d = somenteDigitos(valor).slice(0, 11);

  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function mascaraTelefone(valor) {
  const d = somenteDigitos(valor).slice(0, 11);

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

export function mascaraCEP(valor) {
  const d = somenteDigitos(valor).slice(0, 8);

  return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
}

export const mascaras = { cpf: mascaraCPF, telefone: mascaraTelefone, cep: mascaraCEP };
