import { renderizarLista } from "../templates/engine.js";
import { modeloProjeto, modeloBadge } from "../templates/modelos.js";
import { projetos } from "../dados/projetos.js";

export function iniciar(principal) {
  const area = principal.querySelector('[data-lista="projetos"]');

  if (!area) {
    return;
  }

  const dados = projetos.map(function (projeto) {
    return Object.assign({}, projeto, { badges: renderizarLista(modeloBadge, projeto.badges) });
  });

  area.innerHTML = renderizarLista(modeloProjeto, dados);
}
