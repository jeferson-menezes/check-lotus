class ResultadoService {

    constructor() {

        this._http = new HttpService()
        this._urlLoto = 'http://confiraloterias.com.br/api0/json.php?loteria=megasena&token=9yNMw5h0K2QTUEC';

    }

    obterResultadoConcurso(concurso) {
        console.log(concurso);
       return this._http.get(`${this._urlLoto}&concurso=${concurso}`)
    }
}