import { Bind } from "../helpers/Bind.js";
import { MegaHelper } from "../helpers/MegaHelper.js";
import { Alerta } from "../model/Alerta.js";
import { Concurso } from "../model/Concurso.js";
import { ListaJogos } from "../model/ListaJogos.js";
import { Loading } from "../model/Loading.js";
import { Resultado } from "../model/Resultado.js";
import { ResultadoService } from "../service/ResultadoService.js";
import { AlertaView } from "../view/AlertaView.js";
import { JogosView } from "../view/JogosView.js";
import { LoadingView } from "../view/LoadingView.js";
import { ResultadoView } from "../view/ResultadoView.js";

export class MegaController {

    constructor() {

        const $ = document.querySelector.bind(document);
        this._jogo = [];
        this._resultado = [];
        this._alerta = new Bind(
            new Alerta(),
            new AlertaView($("#view-alert")), "texto");

        this._listaJogos = new Bind(
            new ListaJogos(),
            new JogosView($("#view-jogos")), 'adiciona')

        this._sorteio = new Bind(
            new Resultado(),
            new ResultadoView($("#view-resultado")), "adicionaConcurso"
        )

        this._loading = new Bind(
            new Loading(),
            new LoadingView($("#view-loading")), "show", "hide"
        )

        this._resultadoService = new ResultadoService();

        this.$selectDezenas = $("#select-dezenas");
        this.$inputConcurso = $("#input-concurso");

    }

    adicionaValorPalpite(dezena) {
        if (MegaHelper.dezenaValida(dezena)) {
            if (this._jogo.includes(dezena.padStart(2, '0'))) {
                this._showAlert("Dezena já adicionada!", "warning")
            } else {
                this._jogo.push(dezena.padStart(2, '0'));
            }
        } else {
            this._showAlert("Dezena inválida!", "warning")
        }

        if (this._jogo.length == this.$selectDezenas.value) {
            this._listaJogos.adiciona(this._jogo)
            this._jogo = [];
        }
    }

    adicionarJogos(jogos = []) {
        console.log(jogos);
        for (const jogo of jogos) {
            const dezenas = jogo.split('-').map(e => e.trim())
            this._jogo.push(...dezenas)
            this._listaJogos.adiciona(this._jogo)
            this._jogo = []
        }
    }

    adicionaValorResultado(dezena) {
        if (MegaHelper.dezenaValida(dezena)) {
            if (this._resultado.includes(dezena.padStart(2, '0'))) {
                this._showAlert("Dezena já adicionada!", "warning")
            } else {
                this._resultado.push(dezena.padStart(2, '0'));
            }
        } else {
            this._showAlert("Dezena inválida!", "warning")
        }

        if (this._resultado.length == 6) {
            const concurso = new Concurso(this._resultado)

            this._setConcurso(concurso)
            this._resultado = [];
        }
    }

    async obterResultadoConcurso() {
        this._loading.show()
        try {

            if (!this.$inputConcurso.value) {
                throw new Error("Informe o numero do concurso!")
            }

            const res = await this._resultadoService.obterResultadoConcurso(this.$inputConcurso.value)

            if (res.erro) {
                throw new Error(res.erro)
            }

            console.log(res);
            const concurso = new Concurso(res.dezenas, res.arrecadacao_total,
                res.local_realizacao, res.local_realizacao, res.numero_concurso
                , res.data_concurso
                , res.valor_acumulado, res.premiacao)
            this._setConcurso(concurso)

        } catch (error) {
            console.error(error);
            this._showAlert(error, "danger")
        } finally {
            this._loading.hide();
        }

    }

    _showAlert(texto, tipo) {
        this._alerta.tipo = tipo
        this._alerta.texto = texto
    }

    _setConcurso(concurso) {
        this._sorteio.adicionaConcurso(concurso)
        this._listaJogos.adicionaResultado(concurso.dezenas)
    }

}