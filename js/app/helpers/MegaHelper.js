export class MegaHelper {

    static dezenaValida(dezena) {
        return Number(dezena) >= 1 && Number(dezena) <= 60;
    }

    static dezenasAcertadas(palpipes, resultado) {
        return palpipes.filter(p => resultado.includes(p));
    }

    static dezenasErradas(palpipes, resultado) {
        return palpipes.filter(p => !resultado.includes(p));
    }

    static jogoValido(jogo) {
        return /\d{2}\s*-\s*\d{2}\s*-\s*\d{2}\s*-\s*\d{2}\s*-\s*\d{2}\s*-\s*\d{2}/g.test(jogo)
    }
}