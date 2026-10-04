export function iniciarMenu() {
  const menu = document.querySelector('nav[aria-label="Navegação Principal"]');
  const botao = menu ? menu.querySelector(".nav-toggle") : null;
  const lista = menu ? menu.querySelector(".nav-list") : null;

  if (!botao || !lista) {
    return;
  }

  const rotulo = botao.querySelector(".visually-hidden");

  menu.classList.add("nav-js");

  function alternar(abrir) {
    lista.classList.toggle("aberto", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    rotulo.textContent = abrir ? "Fechar menu" : "Abrir menu";
  }

  botao.addEventListener("click", function () {
    alternar(botao.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && lista.classList.contains("aberto")) {
      alternar(false);
      botao.focus();
    }
  });

  document.addEventListener("rota:mudou", function () {
    alternar(false);
  });
}
