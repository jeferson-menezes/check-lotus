export class CurrencyHelper {

    static toReal(value) {
        return currency(value).format({ separator: '.', decimal: ',', symbol: 'R$ ' })
    }
}