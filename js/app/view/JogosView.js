import { View } from "./View.js";
import { MegaHelper } from "../helpers/MegaHelper.js";

export class JogosView extends View {

    constructor(elemento) {
        super(elemento)
        this._premios = [" - Nadinha", " - Péssimo", " - Ruim", " - Raspando", " - Rendeu", " - Aleluia", " - Pode pedir as contas"];
    }

    template(model) {
        return ` 
        <table class="table table-striped table-sm mt-2">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Jogo</th>
                    <th>Acertos</th>
                    <th>Erros</th>
                    <th>Prêmio</th>
                </tr>
            </thead>

            <tbody>
            ${model.jogos.map((j, i) => {
            const certos = MegaHelper.dezenasAcertadas(j, model.resultado)
            const errados = MegaHelper.dezenasErradas(j, model.resultado)
            return `<tr> 
                <td><span class="badge text-black-50">${i+1}</span></td>
                <td>${this._montaGridDezenas(j, "primary")}</td>
                <td>${this._montaGridDezenas(certos, "success")}</td>
                <td>${this._montaGridDezenas(errados, "danger")}</td>
                <td><span class="badge bg-warning"><span class="badge text-bg-secondary">${certos.length}</span>${this._premios[certos.length]}</span></td>
            </tr>`
        }).join('')}
            </tbody>
        <tbody>`
    }

    _montaGridDezenas(dezenas, cor) {
        return dezenas.map(d => `<span class=" mini-grids rounded-circle text-white bg-${cor}">${d}</span>`).join('')
    }
}