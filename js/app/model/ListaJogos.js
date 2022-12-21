export class ListaJogos {

    constructor() {

        this._jogos = [];
        this._resultado = [];
    }

    adiciona(jogo) {
        jogo.sort();
        this._jogos.push(jogo);
    }

    adicionaResultado(resultado) {
        resultado.sort()
        this._resultado = resultado;
    }

    get jogos() {
        return [].concat(this._jogos);
    }

    get resultado() {
        return [].concat(this._resultado);
    }

}