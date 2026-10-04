export function iniciarModais() {
  document.addEventListener("click", function (evento) {
    const abrir = evento.target.closest("[data-modal-abrir]");
    const fechar = evento.target.closest("[data-modal-fechar]");

    if (abrir) {
      const modal = document.getElementById(abrir.getAttribute("data-modal-abrir"));

      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }

      return;
    }

    if (fechar) {
      const modal = fechar.closest("dialog");

      if (modal) {
        modal.close();
      }

      return;
    }

    if (evento.target instanceof HTMLDialogElement) {
      evento.target.close();
    }
  });
}
