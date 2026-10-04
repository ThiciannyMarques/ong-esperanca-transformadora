import { iniciar as iniciarInicio } from "./inicio.js";
import { iniciar as iniciarProjetos } from "./projetos.js";
import { iniciar as iniciarCadastro } from "./cadastro.js";

export const rotas = {
  "": { arquivo: "inicio", titulo: "Início", iniciar: iniciarInicio },
  projetos: { arquivo: "projetos", titulo: "Projetos Sociais", iniciar: iniciarProjetos },
  cadastro: { arquivo: "cadastro", titulo: "Cadastro de Voluntários e Doadores", iniciar: iniciarCadastro },
  componentes: { arquivo: "componentes", titulo: "Guia de Componentes" }
};

export const rotaNaoEncontrada = { arquivo: "nao-encontrada", titulo: "Página não encontrada" };
