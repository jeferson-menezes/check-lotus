export class Alerta {
    constructor(texto, tipo) {

        this._texto = texto || '';
        this._tipo = tipo || '';
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
        if (texto) this._limpa();
    }


    get tipo() {
        return this._tipo;
    }

    set tipo(tipo) {
        this._tipo = tipo;
    }

    _limpa() {
        setTimeout(() => {
            console.log('caiu');
            this.texto = "";
        }, 4000);
    }

}