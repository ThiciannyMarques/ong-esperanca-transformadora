export function mostrarToast(texto, tipo) {
  let area = document.getElementById("toast-area");

  if (!area) {
    area = document.createElement("div");
    area.id = "toast-area";
    area.className = "toast-area";
    document.body.appendChild(area);
  }

  const toast = document.createElement("div");
  const conteudo = document.createElement("span");
  const fechar = document.createElement("button");

  toast.className = "toast toast-" + tipo;
  toast.setAttribute("role", tipo === "erro" ? "alert" : "status");
  conteudo.className = "toast-texto";
  conteudo.textContent = texto;
  fechar.type = "button";
  fechar.className = "toast-fechar";
  fechar.setAttribute("aria-label", "Fechar notificação");
  fechar.innerHTML = "&times;";

  function remover() {
    toast.classList.remove("visivel");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }

  fechar.addEventListener("click", remover);
  toast.appendChild(conteudo);
  toast.appendChild(fechar);
  area.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add("visivel");
  });
  setTimeout(remover, 5000);
}

export function iniciarToasts() {
  document.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-toast]");

    if (botao) {
      mostrarToast(botao.getAttribute("data-toast-texto"), botao.getAttribute("data-toast"));
    }
  });
}
