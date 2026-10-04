export const modeloIndicador = `
<article class="indicador">
  <span class="indicador-numero">{{valor}}</span>
  <p class="indicador-texto">{{rotulo}}</p>
</article>`;

export const modeloBadge = `<span class="badge badge-{{tipo}}">{{texto}}</span>`;

export const modeloProjeto = `
<article class="projeto-card" id="{{id}}">
  <img src="{{imagem}}" width="{{largura}}" height="{{altura}}" alt="{{alt}}">
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
