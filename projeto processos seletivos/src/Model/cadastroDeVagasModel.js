import { empresaModel } from "./empresaModel.js"

export class cadastroDeVagas {
    #nomeDavaga    
    #modalidadeDeTrabalho
    #empresa

    constructor(nomeDaVaga, modalidadeDeTrabalho, empresa) {
        this.#nomeDavaga = nomeDaVaga;
        this.#modalidadeDeTrabalho = modalidadeDeTrabalho;

        if (empresa instanceof empresaModel) {
            this.#empresa = empresa;
        } else {
            throw new Error("A empresa precisa ser uma instância de empresaModel");
        }

        this.id = null;
    }



    getNomeVagas() {
        return this.#nomeDavaga
    }

    getModalidadeDeTrabalho() {
        return this.#modalidadeDeTrabalho
    }

    getEmpresa() {
        return {
            nome: this.#empresa.getNomeDaEmpresa(),
            cnpj: this.#empresa.getCnpj(),
            cep: this.#empresa.getCep()
        };
    }

    setNomeVagas(nome) {
        this.#nomeDavaga = nome;
    }

    setModalidadeDeTrabalho(modalidade) {
        this.#modalidadeDeTrabalho = modalidade;
    }


}
