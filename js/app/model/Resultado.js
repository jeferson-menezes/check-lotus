class Resultado {

    constructor() {
        this._concurso = {};
    }

    get concurso() {
        return this._concurso;
    }

    adicionaConcurso(concurso) {
      this._concurso = concurso
    }
}