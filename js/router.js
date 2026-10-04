import { rotas, rotaNaoEncontrada } from "./paginas/index.js";

const TITULO_SITE = "ONG Esperança Transformadora";
const principal = document.getElementById("conteudo");
let navegacaoAtual = 0;

function lerHash() {
  const caminho = window.location.hash.replace(/^#\/?/, "");
  const [rota, ancora] = caminho.split("/");
  return { rota: rota || "", ancora: ancora || "" };
}

function marcarMenu(rota) {
  document.querySelectorAll("[data-rota]").forEach(function (link) {
    if (link.getAttribute("data-rota") === rota) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

async function carregarFragmento(arquivo) {
  const resposta = await fetch("html/" + arquivo + ".html");

  if (!resposta.ok) {
    throw new Error("Falha ao carregar " + arquivo);
  }

  return resposta.text();
}

async function navegar() {
  const hash = window.location.hash;

  if (hash && !hash.startsWith("#/")) {
    return;
  }

  const { rota, ancora } = lerHash();
  const pagina = rotas[rota] || rotaNaoEncontrada;

  const identificador = ++navegacaoAtual;
  let conteudo;

  principal.setAttribute("aria-busy", "true");

  try {
    conteudo = await carregarFragmento(pagina.arquivo);
  } catch (erro) {
    conteudo =
      '<section class="intro-pagina"><div class="container"><h1>Não foi possível carregar a página</h1>' +
      "<p>Verifique sua conexão e tente novamente.</p></div></section>";
  }

  if (identificador !== navegacaoAtual) {
    return;
  }

  principal.innerHTML = conteudo;

  document.title = pagina.titulo + " | " + TITULO_SITE;
  marcarMenu(rotas[rota] ? rota : null);

  if (pagina.iniciar) {
    pagina.iniciar(principal);
  }

  principal.removeAttribute("aria-busy");
  document.dispatchEvent(new CustomEvent("rota:mudou", { detail: { rota: rota } }));

  const alvo = ancora ? document.getElementById(ancora) : null;

  if (alvo) {
    alvo.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
    principal.focus({ preventScroll: true });
  }
}

export function iniciarRouter() {
  window.addEventListener("hashchange", navegar);
  navegar();
}
