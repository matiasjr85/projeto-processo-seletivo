export class empresaModel {
    #nomeDaempresa;
    #cnpj;    
    #cep

    constructor(nomeDaEmpresa, cnpj,cep) {
        this.#nomeDaempresa = nomeDaEmpresa;
        this.#cnpj = cnpj;        
        this.#cep = cep;
    }

    getNomeDaEmpresa() {
        return this.#nomeDaempresa;
    }

    getCnpj() {
        return this.#cnpj;
    }    

    getCep() {
        return this.#cep;
    }
    

    async buscarEndereco() {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${this.#cep}/json/`);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar o endereço');
            }

            const dados = await response.json();

            if (dados.erro) {
                console.log('CEP não encontrado');
                return null;
            }

            return dados; 
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
