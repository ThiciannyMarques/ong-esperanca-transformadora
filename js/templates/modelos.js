export const modeloIndicador = `
<article class="indicador">
  <span class="indicador-numero">{{valor}}</span>
  <p class="indicador-texto">{{rotulo}}</p>
</article>`;

export const modeloBadge = `<span class="badge badge-{{tipo}}">{{texto}}</span>`;

export const modeloProjeto = `
<article class="projeto-card" id="{{id}}">
  <picture>
    <source type="image/webp" srcset="{{imagem}}-400.webp 400w, {{imagem}}.webp 740w" sizes="(min-width: 768px) 50vw, 100vw">
    <img src="{{imagem}}.jpg" srcset="{{imagem}}-400.jpg 400w, {{imagem}}.jpg 740w" sizes="(min-width: 768px) 50vw, 100vw" width="{{largura}}" height="{{altura}}" loading="lazy" decoding="async" alt="{{alt}}">
  </picture>
  <div class="projeto-corpo">
    <p class="grupo-componentes">{{{badges}}}</p>
    <h3>{{titulo}}</h3>
    <p>{{resumo}}</p>
    <p>{{detalhe}}</p>
    <p class="projeto-beneficiados">{{beneficiados}}</p>
    <a class="btn {{classeBotao}}" href="#/cadastro">Apoiar este projeto</a>
  </div>
</article>`;

export const modeloCadastro = `
<li class="cadastro-item">
  <span><strong>{{nome}}</strong> <span class="badge badge-info">{{modalidade}}</span></span>
  <button type="button" class="btn btn-contorno-escuro btn-pequeno" data-remover="{{id}}" aria-label="Remover cadastro de {{nome}}">Remover</button>
</li>`;
