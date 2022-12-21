import { View } from "./View.js";

export class AlertaView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        return model.texto ?
            `<div class="alert alert-${model.tipo}" role="alert">${model.texto} </div>` : ``;
    }
}