/*
 check lotus
 Copyright (c) 2022 Jeferson Menezes
 updated 2022-12-20
*/

import '../lib/currency.min.js';

import { MegaController } from './controller/MegaController.js';
import { MegaHelper } from './helpers/MegaHelper.js';

const megaController = new MegaController();
// console.log(megaController);

const $inputJogo = document.querySelector("#input-jogo");
const $inputResultado = document.querySelector("#input-resultado");
const $buttonResultado = document.querySelector("#button-resultado")
const $fileJogo = document.querySelector('#arquivo-jogo')

$inputJogo.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        megaController.adicionaValorPalpite($inputJogo.value.trim());
        $inputJogo.value = "";
    }
});

$inputResultado.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        megaController.adicionaValorResultado($inputResultado.value.trim());
        $inputResultado.value = "";
    }
});

$buttonResultado.addEventListener('click', function (event) {
    event.preventDefault()
    megaController.obterResultadoConcurso()
})

$fileJogo.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader()

    reader.onloadend = function () {

        const linhas = reader.result.split('\n')

        const colunas = linhas.map(e => e.split(','));

        const achatado = colunas.reduce((a, c) => a.concat(c), [])

        const jogos = achatado.filter(e => MegaHelper.jogoValido(e))

        megaController.adicionarJogos(jogos)
    }

    reader.readAsText(file)
})

