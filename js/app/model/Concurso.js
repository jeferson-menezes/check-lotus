class Concurso {

    constructor(dezenas, arrecadacao = "", cidade = "", local = "", numero = "", data = "", valorAcumulado = "", premiacao = {}) {
        this._dezenas = dezenas;
        this._arrecadacaoTotal = arrecadacao;
        this._cidade = cidade;
        this._local = local;
        this._numero = numero;
        this._data = data;
        this._valorAcumulado = valorAcumulado;
        this._premiacao = premiacao;
    }

    get dezenas() {
        return this._dezenas
    }

    get arrecadacaoTotal() {
        return this._arrecadacaoTotal
    }

    get cidade() {
        return this._cidade;
    }
    get local() {
        return this._local
    }

    get numero() {
        return this._numero
    }

    get data() {
        return this._data
    }

    get valorAcumulado() {
        return this._valorAcumulado
    }

    get premiacao(){
        return this._premiacao
    }
}