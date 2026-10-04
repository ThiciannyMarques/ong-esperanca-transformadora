# ONG Esperança Transformadora

Plataforma web para uma ONG fictícia do terceiro setor. É uma Single Page Application (SPA) feita apenas com HTML, CSS e JavaScript puro, sem bibliotecas externas, e publicada no GitHub Pages.

**Site publicado:** https://thiciannymarques.github.io/ong-esperanca-transformadora/

## Funcionalidades

- Navegação sem recarregar a página (roteamento por hash, como `#/projetos`).
- Templates em JavaScript para gerar cartões de projetos, indicadores e lista de cadastros.
- Formulário de cadastro com máscaras (CPF, telefone, CEP) e validação com mensagens por campo.
- Persistência no `localStorage`: cadastros enviados e rascunho do formulário.
- Componentes de feedback: badges, alertas, toasts e modal (veja `#/componentes`).
- Menu responsivo com submenu (desktop) e botão hambúrguer (celular).
- Layout em grid de 12 colunas, com cinco pontos de quebra (480, 768, 1024, 1280 e 1536 px).

## Tecnologias

HTML5 semântico, CSS3 (variáveis, Grid, Flexbox) e JavaScript com módulos ES.

## Estrutura do projeto

```
ong-esperanca-transformadora/
├── index.html              Casca da SPA (cabeçalho, <main> e rodapé)
├── html/                   Fragmentos de cada página
├── css/styles.css          Estilos e Design System (variáveis)
├── imagens/                Logo e ilustrações
└── js/
    ├── main.js             Ponto de entrada
    ├── router.js           Roteamento por hash
    ├── paginas/            Lógica de cada rota
    ├── templates/          Motor e modelos de templates
    ├── dados/              Dados dos projetos e indicadores
    ├── componentes/        Menu, toast e modal
    └── formulario/         Máscaras, validação e localStorage
```

## Como executar localmente

A aplicação carrega os fragmentos de `html/` com `fetch`, por isso **não funciona abrindo o `index.html` com duplo clique**. É preciso um servidor local.

Pré-requisito: Git e Python 3 (ou Node.js).

```bash
git clone https://github.com/ThiciannyMarques/ong-esperanca-transformadora.git
cd ong-esperanca-transformadora
python -m http.server 8080
```

Depois, abra http://localhost:8080 no navegador. Com Node.js, o equivalente é `npx serve .`.

## Build de produção

O projeto usa o [Vite](https://vite.dev) para gerar a versão de produção. Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run build
npm run preview
```

- `npm run build` gera a pasta `dist/`, com o JavaScript agrupado em um único arquivo, o CSS e o HTML minificados e os fragmentos de `html/` também minificados (via `html-minifier-terser`). As imagens são copiadas sem alteração.
- `npm run preview` serve a pasta `dist/` para conferir o resultado.
- `npm run dev` abre o servidor de desenvolvimento com recarregamento automático.
- A pasta `dist/` não é versionada (está no `.gitignore`).

Não há testes automatizados neste projeto.

## Como usar

- **Início:** apresentação da ONG e indicadores de impacto.
- **Projetos:** catálogo de projetos, com badges e botão de apoio.
- **Cadastro:** formulário para voluntários e doadores. Os dados ficam apenas no navegador, e os cadastros salvos aparecem abaixo do formulário, com opção de remover.
- **Guia de componentes:** `#/componentes` mostra todos os componentes de feedback.

## Manutenção

- **Novo projeto no catálogo:** adicione um objeto em `js/dados/projetos.js`.
- **Nova página:** crie o fragmento em `html/`, registre a rota em `js/paginas/index.js` e adicione o link no menu do `index.html`.
- **Cores, fontes e espaçamentos:** altere as variáveis no início de `css/styles.css`.

## Deploy

O site é publicado pelo GitHub Pages a partir da branch `main`, na raiz do repositório (Settings > Pages > Deploy from a branch). Cada push na `main` atualiza o site em poucos minutos.

## Fluxo de trabalho com Git

O repositório segue o GitFlow:

| Branch | Função |
|---|---|
| `main` | Versões de lançamento, sempre estáveis e marcadas com tag (`v1.0.0`) |
| `develop` | Integração do desenvolvimento contínuo |
| `feature/*` | Uma branch por funcionalidade, criada a partir da `develop` |
| `release/*` | Preparação de uma versão antes de ir para a `main` |
| `hotfix/*` | Correções urgentes feitas a partir da `main` |

As mensagens de commit seguem o padrão semântico:

- `feat:` nova funcionalidade
- `fix:` correção de erro
- `docs:` documentação
- `style:` formatação, sem mudança de comportamento
- `refactor:` reorganização de código
- `chore:` tarefas de manutenção

## Autoria

Projeto acadêmico desenvolvido por ThiciannyMarques na disciplina de Desenvolvimento Front-end.
