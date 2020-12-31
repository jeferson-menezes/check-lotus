class MegaHelper {

    static dezenaValida(dezena) {
        return Number(dezena) >= 1 && Number(dezena) <= 60;
    }

    static dezenasAcertadas(palpipes, resultado) {
        return palpipes.filter(p => resultado.includes(p));
    }

    static dezenasErradas(palpipes, resultado) {
        return palpipes.filter(p => !resultado.includes(p));
    }
}