const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escaparHtml(texto) {
  return String(texto).replace(/[&<>"']/g, function (caractere) {
    return ESCAPES[caractere];
  });
}

export function renderizar(modelo, dados) {
  return modelo.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, function (_, bruto, seguro) {
    if (bruto !== undefined) {
      return dados[bruto] === undefined ? "" : String(dados[bruto]);
    }

    return dados[seguro] === undefined ? "" : escaparHtml(dados[seguro]);
  });
}

export function renderizarLista(modelo, lista) {
  return lista
    .map(function (item) {
      return renderizar(modelo, item);
    })
    .join("");
}
