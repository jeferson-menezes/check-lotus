import { HttpService } from "./HttpService.js"

export class ResultadoService {

    constructor() {

        this._http = new HttpService()
        this._urlLoto = ' https://apiloterias.com.br/app/resultado?loteria=megasena&token=g8itKyyrUsFgG5K';

    }

    obterResultadoConcurso(concurso) {
        return this._http.get(`${this._urlLoto}&concurso=${concurso}`)
    }

}