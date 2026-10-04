import { renderizarLista } from "../templates/engine.js";
import { modeloIndicador } from "../templates/modelos.js";
import { indicadores } from "../dados/indicadores.js";

export function iniciar(principal) {
  const area = principal.querySelector('[data-lista="indicadores"]');

  if (area) {
    area.innerHTML = renderizarLista(modeloIndicador, indicadores);
  }
}
