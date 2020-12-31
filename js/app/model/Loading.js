class Loading {

    constructor() {
        this._visible = false
    }

    get visible(){
        return this._visible;
    }
    show() {
        this._visible = true
    }

    hide() {
        this._visible = false
    }
}