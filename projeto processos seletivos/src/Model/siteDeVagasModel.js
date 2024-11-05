import { cadastroDeVagas } from "./cadastroDeVagasModel.js";

export class siteDeVagas {
    #nome
    #vaga

    constructor (nome, vaga) {
        this.#nome = nome;
        this.#vaga = new cadastroDeVagas(vaga);
    }

    getNome() {
        return this.#nome
    }

    getVaga() {
        return this.#vaga
    }
}