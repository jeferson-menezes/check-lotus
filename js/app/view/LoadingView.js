import { View } from "./View.js";

export class LoadingView extends View {

    constructor(elemento) {
        super(elemento)
    }

    template(model) {
        return model.visible ? `<div class="mx-auto"  style="width: 800px; text-align: center;">
        Aguarde...<br>
        <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>` : ``
    }
}