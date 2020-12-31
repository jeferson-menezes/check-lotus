class ResultadoView extends View {

  constructor(elemento) {
    super(elemento);
  }

  template(model) {
    console.log(model);
    if (!model.concurso.dezenas) {
      return this._statico();
    } else {

      return !model.concurso.cidade
        ? this._simples(model.concurso.dezenas)
        : this._completo(model.concurso)
    }
  }

  _statico() {
    return `<div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          id="input-resultado"
          placeholder="informe uma dezena do resultado e de enter"
        />
        <input
          type="text"
          class="input-group-append"
          id="input-concurso"
          placeholder="informe do concurso"
          aria-describedby="button"
        />
        <div class="input-group-append">
          <button onclick="megaController.obterResultadoConcurso()" class="btn btn-info" type="button" id="button-resultado">
            Obter resultado
          </button>
        </div>
      </div>`
  }

  _simples(resultado) {
    return `  <div class="mx-auto"  style="width: 800px; text-align: center;">
             ${resultado.map(el => `<span class=" grids rounded-circle text-white bg-success">${el}</span>`).join('')}
             </div><hr/>`
  }

  _completo(concurso) {
    return `
    <div class="mx-auto"  style="width: 800px">
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item"><strong>Concurso</strong><br>${concurso.numero}</li>
            <li class="list-group-item"><strong>Data</strong><br> ${concurso.data}</li>
            <li class="list-group-item"><strong>Cidade</strong><br> ${concurso.cidade}</li>
            <li class="list-group-item"><strong>Arecadação</strong><br> ${concurso.arrecadacaoTotal}</li>
            <li class="list-group-item"><strong>Acumulado</strong><br> ${concurso.valorAcumulado}</li>
            <li class="list-group-item"><strong>Sena</strong><br> ${concurso.premiacao.sena.ganhadores}</li>
        </ul>
    </div>
    ${this._simples(concurso.dezenas)}
    `
  }

}