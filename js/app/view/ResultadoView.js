
import { CurrencyHelper } from '../helpers/CurrencyHelper.js';
import { DateHelper } from "../helpers/DateHelper.js";
import { View } from "./View.js";

export class ResultadoView extends View {

  constructor(elemento) {
    super(elemento);
  }

  template(model) {
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
          <button class="btn btn-info" type="button" id="button-resultado">
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
            <li class="list-group-item"><strong>Data</strong><br> ${DateHelper.toBr(concurso.data)}</li>
            <li class="list-group-item"><strong>Cidade</strong><br> ${concurso.cidade}</li>
            <li class="list-group-item"><strong>Arecadação</strong><br> ${CurrencyHelper.toReal(concurso.arrecadacaoTotal)}</li>
            <li class="list-group-item"><strong>Acumulado</strong><br> ${CurrencyHelper.toReal(concurso.valorAcumulado)}</li>
            <li class="list-group-item"><strong>Premiação</strong><br> 

            <ol class="list-group list-group-numbered">

            ${concurso.premiacao.map(e => `
              <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"> <strong>${e.nome}</strong></div>
      ${e.quantidade_ganhadores} Ganhadores
    </div>
    <span class="badge bg-primary rounded-pill">${CurrencyHelper.toReal(e.valor_total)}</span>
            `).join('')}
            </li>
            </li>
        </ul>
    </div>
    ${this._simples(concurso.dezenas)}
    `
  }

}